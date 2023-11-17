output "droplet_ip" {
  value = "ssh -i ./about_me_id_rsa leaf@${digitalocean_droplet.droplet.ipv4_address}"
}
