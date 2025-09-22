output "redis_host" {
  value = google_redis_instance.redis.host
}
output "redis_port" {
  value = google_redis_instance.redis.port
}
output "vpc_connector_full_name" {
  value = "projects/${var.project_id}/locations/${var.region}/connectors/${google_vpc_access_connector.connector.name}"
}
