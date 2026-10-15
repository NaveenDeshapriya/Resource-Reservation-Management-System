
# Resource Reservation Management System

Create solution for manage resource reservation in application through. Got a hotel system booking process how it begining to end  functionalities for allowance users and administrative.


## Installation

Install require dependencies

```bash
  npm install pg
  npm install -D @types/pg
```

    
## API Reference

#### Save to reservation details

```http
  POST /api/savereservation
```
#### Get all reservations

```http
  GET /api/savereservation
```

#### Update reservations

```http
  POST /api/updatereservation
```
#### Get available room number

```http
  GET /api/booking
```
#### Update reservation status complete reservation date

```http
  POST /api/booking
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PG_HOST`/
`PG_USERNAME`/
`PG_PORT`/
`PG_PASSWORD`/
`PG_DATABASE`


## Documentation

Create Next latest version 16.4

To organize to resource reservations mainly focus manage data inconcensty and erros.

table of core reservation, room and status

Primary keys,

- reservation - reservation_no
- room - room_no
- status - id

Foriegn Keys,

- reservation and status - reservation(status_id) M--1 staus(id) 
- room and status - room(status_id) M--1 status(id)
- reservation and room - reservation(room_no) M--1 room(room_no)

Reservation and Room table between Many to One relation.

Why relation import 

Because one to one relation for important to unique details keep reservation table but booking system after reservation it renew next reservation for important update room status and keep a history records.

 That reservation details important future process. Such as (email services..)


## Features

Users
- Users can booking if not already booked all.
- Can reservate to available date.
- Notify mistakes during the reservation process(validations)

Administration
- Load latest reservations according to orders.
- Can get a seraching reservation details.
- Reservation canceling or confirmation.
- After end of reservation date manage reservation and automatically   update room status.
- Notify mistakes during the reservation process(validations)

## Deployment

To deploy this project run

```bash
  npm run dev
```

