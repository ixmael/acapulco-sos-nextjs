variable "environment" {
  type        = string
  description = "The environment to deploy"
  default     = "production"
}

variable "update_token" {
  type        = string
  description = "Token to update the content"
}

variable "spaceid" {
  type        = string
  description = "The Contentful Space ID"
}

variable "access_token" {
  type        = string
  description = "The Contentful access token"
}
