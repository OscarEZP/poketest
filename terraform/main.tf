terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = { source = "hashicorp/google", version = "~> 6.0" }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_project_service" "services" {
  for_each = toset([
    "appengine.googleapis.com",
    "cloudbuild.googleapis.com",
    "vpcaccess.googleapis.com",
    "redis.googleapis.com",
  ])
  project = var.project_id
  service = each.key
}

resource "google_app_engine_application" "app" {
  project     = var.project_id
  location_id = var.app_engine_location  # p.ej. "europe-west"
  depends_on  = [google_project_service.services]
}

resource "google_compute_network" "vpc" {
  name                    = var.network_name
  auto_create_subnetworks = true
}

resource "google_vpc_access_connector" "connector" {
  name          = var.connector_name
  region        = var.region
  network       = google_compute_network.vpc.name
  ip_cidr_range = var.connector_cidr
  depends_on    = [google_project_service.services]
}

resource "google_redis_instance" "redis" {
  name               = var.redis_name
  region             = var.region
  tier               = "BASIC"
  memory_size_gb     = var.redis_size_gb
  authorized_network = google_compute_network.vpc.id
  # opcional: redis_version, read_replicas_mode, auth_enabled, transit encryption, etc.
  depends_on         = [google_project_service.services]
}

data "google_project" "current" {}
locals {
  app_engine_sa = "${data.google_project.current.project_id}@appspot.gserviceaccount.com"
  cloud_build_sa = "${data.google_project.current.number}@cloudbuild.gserviceaccount.com"
}

resource "google_project_iam_member" "appengine_vpcaccess_user" {
  project = var.project_id
  role    = "roles/vpcaccess.user"
  member  = "serviceAccount:${local.app_engine_sa}"
}

resource "google_project_iam_member" "cloudbuild_appengine_deployer" {
  project = var.project_id
  role    = "roles/appengine.deployer"
  member  = "serviceAccount:${local.cloud_build_sa}"
}

resource "google_project_iam_member" "cloudbuild_sa_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${local.cloud_build_sa}"
}

resource "google_cloudbuild_trigger" "github_trigger" {
  name = "appengine-deploy-on-main"
  github {
    owner = var.github_owner
    name  = var.github_repo
    push { branch = var.github_branch_regex }
  }

  filename = "cloudbuild.yaml"  # usará el del repo raíz
  depends_on = [google_project_service.services]
}
