# CMS Admin Panel Dashboard
A content management system for Accessible Web Media Administrators

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16.17.0 or later (I used latest instead of LTS... oops))
- use `npm ci` to install all dependencies NOT `npm install`
- use NVM to manage Node versions. NVM for windows can be found on Github [here](https://github.com/coreybutler/nvm-windows)
- use `nvm install 16.17.0` to install Node v16.17.0. Use `nvm use 16.17.0` to use Node v16.17.0. Use `nvm list` to see all installed versions of Node.
- use `ionic serve` to run the app in the browser
- use `ionic build` to build the app for production
- might need to reinstall ionic cli with `npm install -g @ionic/cli` if changed node versions
- might need to reinstall firebase cli with `npm install -g firebase-tools` if changed node versions

## Notes

Project started on Github for version control and collaboration.  I'm using the Ionic Framework to build the app.  I'm using Firebase for the backend.  I'm using the Angular Framework for the frontend.  I'm using the Capacitor Framework to build the app for mobile devices.




.then(
    async () => {
      const alert = await this.alertCtrl.create({
        message: 'Check your email for a password reset link',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.router.navigateByUrl('login');
            },
          },
        ],
      });
      await alert.present();
    },
    async error => {
      const errorAlert = await this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      await errorAlert.present();
    }
  );
}
