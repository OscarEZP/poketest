variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "europe-west1" 
}

variable "app_engine_location" {
  type    = string
  default = "europe-west1" 
}

variable "network_name" {
  type    = string
  default = "app-vpc"
}

variable "connector_name" {
  type    = string
  default = "app-connector"
}

variable "connector_cidr" {
  type    = string
  default = "10.8.0.0/28"
}

variable "redis_name" {
  type    = string
  default = "app-redis"
}

variable "redis_size_gb" {
  type    = number
  default = 1
}

variable "create_github_trigger" {
  type    = bool
  default = false
}

variable "github_owner" {
  type    = string
  default = ""
}

variable "github_repo" {
  type    = string
  default = ""
}

variable "github_branch_regex" {
  type    = string
  default = "^main$"
}
