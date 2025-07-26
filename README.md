**PRIVATE CLOUD STORAGE USING RASPBERRY PI**


A self-hosted, privacy-first cloud that runs on a Raspberry Pi, delivers global HTTPS access without static IPs or port-forwarding, and costs little more than the hardware you already own.

**Why This Project?**

| Challenge                     | Our Solution                                                   |
| ----------------------------- | -------------------------------------------------------------- |
| Data privacy & vendor lock-in | Data never leaves your Pi; open-source stack                   |
| Static IP / router setup      | Tailscale Funnel provides public HTTPS URL—zero network hassle |
| Recurring cloud fees          | One-time hardware cost; all software is free                   |
| Limited tech skills           | Step-by-step guide + optional pre-configured SD image          |

**Tech Stack**

| Layer          | Tool                       | Purpose                       |
| -------------- | -------------------------- | ----------------------------- |
| Hardware       | Raspberry Pi 5 + 120GB HDD | Low-power personal server     |
| OS             | Debian Bookworm Lite       | Stable base image             |
| Cloud Platform | Nextcloud                  | Web UI, sync & share          |
| Web Server     | Apache 2                   | Hosts PHP app                 |
| Database       | MariaDB                    | Stores Nextcloud data         |
| VPN + Tunnel   | Tailscale + Funnel         | Zero-config mesh + public URL |

**Hardware Checklist**

Raspberry Pi 5 (or 4/3)

Micro-SD card (16 GB+)

HDD / SSD Size(according to your requirement)

Reliable power supply

Network connection (Ethernet or Wi‑Fi / hotspot)

Quick‑Start Setup
Total time: 30 minutes
Skill: Basic Linux CLI

Mount External Drive

lsblk                      # identify /dev/sda1

yes | sudo mkfs.ext4 /dev/sda1

sudo mkdir /mnt/mydrive
sudo mount /dev/sda1 /mnt/mydrive
sudo chown -R pi:pi /mnt/mydrive
sudo nano /etc/fstab       # add UUID /mnt/mydrive ext4 defaults 0 2

**Install Nextcloud**

sudo apt update && sudo apt upgrade -y
sudo apt install apache2 mariadb-server php libapache2-mod-php \
 php-mysql php-xml php-mbstring php-zip php-curl php-gd \
 php-intl php-bcmath unzip -y

sudo mysql_secure_installation

sudo mysql -u root -p <<EOF
CREATE DATABASE nextcloud;
CREATE USER 'nextclouduser'@'localhost' IDENTIFIED BY 'StrongPass!';
GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextclouduser'@'localhost';
FLUSH PRIVILEGES; EXIT;
EOF

cd /tmp && wget https://download.nextcloud.com/server/releases/latest.zip
unzip latest.zip
sudo mv nextcloud /var/www/html/
sudo chown -R www-data:www-data /var/www/html/nextcloud
sudo chmod -R 755 /var/www/html/nextcloud

**Install & Configure Tailscale**

curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up    # authenticate in browser
sudo systemctl enable tailscaled

**Expose with Tailscale Funnel**
sudo tailscale funnel 80   # get https://<device>.tailnet.ts.net

**Trust the Public URL**
sudo nano /var/www/nextcloud/config/config.php
# Add to 'trusted_domains':
'trusted_domains' => [
  'localhost',
  '192.168.xx.yy',
  '<device>.tailnet.ts.net',
],

**Restart Services**
sudo systemctl restart apache2

**User Impact**

Privacy – Data stays on-premises, with end-to-end encrypted tunnel

Zero networking pain – No static IP, no router port forwarding needed

Cost-effective – One-time hardware investment, minimal energy cost

Multi-user support – Easily manage roles, quotas for teams or families

**Future Expansion**

| Feature               | Highlights                                                      |
| --------------------- | --------------------------------------------------------------- |
| 📱 Mobile App         | Native Android/iOS app for automatic photo backup               |
| 🤖 Smart AI           | Lightweight AI models for auto-tagging, duplicate detection     |
| 🧩 Add‑Ons            | Expand with media streaming, IP camera backups, remote printing |
| ☁️ Hybrid Sync        | Optional sync bridge to S3 or Google Drive for archival storage |
| 🔄 Centralized Option | Hosted version for users who can’t manage hardware locally      |











