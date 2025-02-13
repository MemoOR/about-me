resource "digitalocean_vpc" "main_vpc" {
  name     = "main"
  region   = local.tf_envs["tf_region"]
  ip_range = local.tf_envs["tf_vpc_range"]
}

resource "digitalocean_ssh_key" "my_key" {
  name       = var.project_name
  public_key = file("${path.module}/../about_me_id_rsa.pub")
}

resource "digitalocean_domain" "my_domain" {
  name = "guillermoortega.me"
}

resource "digitalocean_record" "droplet" {
  domain = digitalocean_domain.my_domain.id
  type   = "A"
  name   = "@"
  value  = digitalocean_droplet.droplet.ipv4_address
  ttl    = "300"
}

resource "digitalocean_record" "google" {
  domain = digitalocean_domain.my_domain.id
  type   = "TXT"
  name   = "@"
  value  = local.tf_envs["tf_google_txt_record"]
  ttl    = "300"
}

resource "digitalocean_record" "www_redirection" {
  domain = digitalocean_domain.my_domain.id
  type   = "CNAME"
  name   = "www.guillermoortega.me."
  value  = "guillermoortega.me."
  ttl    = "300"
}

resource "digitalocean_droplet" "droplet" {
  name              = "${var.project_name}-pod"
  size              = "s-1vcpu-512mb-10gb"
  image             = "ubuntu-22-04-x64"
  region            = local.tf_envs["tf_region"]
  vpc_uuid          = digitalocean_vpc.main_vpc.id
  ssh_keys          = [digitalocean_ssh_key.my_key.fingerprint]
  resize_disk       = false
  backups           = false
  graceful_shutdown = false
  ipv6              = true
  monitoring        = true
  user_data = templatefile(
    "${path.module}/cloud-init.yaml",
    {
      init_ssh_public_key = digitalocean_ssh_key.my_key.public_key,
      from_email          = local.tf_envs["tf_from_email"],
      to_email            = local.tf_envs["tf_to_email"],
      app_password        = local.tf_envs["tf_app_password"],
      env_txt             = local.envs_string
      docker_username     = local.tf_envs["tf_docker_username"]
      docker_password     = local.tf_envs["tf_docker_password"]
    }
  )

  lifecycle {
    replace_triggered_by = [null_resource.version_replace]
  }
}

resource "null_resource" "version_replace" {
  triggers = {
    subnet = var.app_version
  }
}
