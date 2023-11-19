output "droplet_ip" {
  value = "ssh -i ./about_me_id_rsa memoor@${digitalocean_droplet.droplet.ipv4_address}"
}
