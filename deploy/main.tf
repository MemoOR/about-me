resource "digitalocean_vpc" "main_vpc" {
  name     = "main"
  region   = local.envs["region"]
  ip_range = local.envs["vpc_range"]
}

resource "digitalocean_ssh_key" "default" {
  name       = var.project_name
  public_key = file("./about_me_id_rsa.pub")
}

resource "digitalocean_droplet" "droplet" {
  name              = "${var.project_name}-pod"
  size              = "s-1vcpu-512mb-10gb"
  image             = "ubuntu-22-04-x64"
  region            = local.envs["region"]
  vpc_uuid          = digitalocean_vpc.main_vpc.id
  ssh_keys          = [digitalocean_ssh_key.default.fingerprint]
  resize_disk       = false
  backups           = false
  graceful_shutdown = false
  ipv6              = true
}
