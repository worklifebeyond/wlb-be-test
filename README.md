# wlb-be-test

### Requirements

1. `Postgre SQL`: Bisa memakain free tier dari Elephant SQL : https://www.elephantsql.com

2. Email Notification. Bisa memakai Sendgrid: https://sendgrid.com/pricing/ atau mailgun: https://www.mailgun.com/

3. Node JS. Download di: https://nodejs.org/en/download/

4. `VPS`, `Server`, `PaaS` yang dapat menjalankan aplikasi Node JS. Bisa memakai free tier Heroku: https://www.heroku.com/pricing

5. `MongoDB`: Bisa memakai free tier dari mongodb atlas https://www.mongodb.com/cloud/atlas

### Tasks

Membuat API untuk aplikasi Blog yang memiliki fitur:

1. Login dan registrasi user dengan ketentuan:

  * Ketika user mendaftar, status user `Terdaftar` dan belum dapat melakukan login kemudian ada notifikasi email sebagai proses verifikasi registrasi kemudian status user menjadi `Aktif`
  
  * Proses autentikasi atau login menggunakan token `jwt`. Token `jwt` ini dijuga dipakai sebagai autentikasi setiap API yang diakses
  
2. User yang terdaftar dapat membuat posting, edit dan menghapus posting.

3. Terdapat fitur komentar disetiap posting, yang dapat memberi komentar hanya user yang terdaftar. Fitur komentar tersebut dapat dimoderasi atau tidak tergantung user menentukan apakah pada posting tersebut dapat dimoderasi atau tanpa moderasi. Fitur komentar dapat dikomentari ulang dengan kedalaman 1;

4. Terdapat fitur `like` pada setiap posting. Yang dapat melakukan `like` adalah user yang terdaftar.

5. Terdapat fitur pemberitahuan setiap kali ada user lain yang like dan komentar pada postingan user. Notifikasi dikirmkan ke email.

6. Jika user `A` misalnya mengomentari postingan user lain, kemudian komentar tersebut dikomentari user lainnya, maka user `A` mendapatkan notifikasi email bahwa komentarnya dikomentari. 

6. Terdapat fitur search berdasarkan posting title.

7. Terdapat fitur filter posting. Filter posting terdapat juga dalam fitur search atau pencarian. Misalnya: Mencari posting atau artikel tentang `Aplikasi Android` kemudian dapat diurutkan berdasarkan `tanggal`, `user`, `komentar terbanyak`, `like` dan untuk beberapa filter dapat `ascending` dan `descending`.

8. Setiap akses ke API terdapat `log` yang disimpan ke `mongodb` dengan isi `log` sebagai berikut: `path` yang diakses, detail user, lama waktu akses API, objek `request`, objek `response` dan `timestamp`.

9. Selain fitur diatas, aplikan boleh menambah fitur-fitur yang menurut aplikan merasa pantas ditambahkan.

10. API di `deploy` di `server` dan dapat dicoba secara online serta dokumentasi yang lengkap menggunakan `POSTMAN` atau `Insomnia`.


### Ketentuan

1. Dibangun menggunakan framework Koa JS. Sequelize untuk ORM PostgreSQL dan Mongoose untuk MongoDB.

2. Menyertakan ERD dari rancangan database yang dibuat.

3. Output API boleh berupa `REST API` atau `GraphQL`


