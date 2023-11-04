resource "docker_container" "frontend" {
  image    = docker_image.frontend.name
  name     = "${local.project_name}-frontend-${var.environment}"
  hostname = "frontend"

  must_run = true

  env = [
    "ENVIRONMENT=${var.environment}",
  ]

  ports {
    external = 9000
    internal = 9000
  }
}

resource "docker_image" "frontend" {
  name = "${local.project_name}/frontend"

  build {
    path       = abspath(path.cwd)
    dockerfile = "./infrastructure/docker/acapulcosos.dockerfile"

    tag = [
      "${var.environment}"
    ]

    label = {
      author : "ixmael"
    }
  }
}