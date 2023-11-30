# Foinix

`Φοίνιξ` in greek. The phoenix is an immortal bird that cyclically regenerates or is otherwise born again.

![Foinix Presentation Mockup](https://github.com/tautf/foinix/assets/18403881/a0fef6ff-3cf7-427e-99b9-88f5eac7d275)

## For what?

As IT-Department in the year of 2023 there is not even enough time to drink a coffee in peace anymore. (If you have self-hosted infrastructure atleast)

One of our biggest problems was, as there was not enough manpower, to keep track of our products lifetimes.

## The Problem

You buy a new server, switch, laptop.

Configure it, put it into production or give to your employees and quickly loose track of the status. The products get older, the warranty is over and certainly they break.

Of course, without any warranty or service subscription you will not get any repair service for free. The costs of repairing are higher than replacing the product.

## The solution (?)

Is `Foinix` the solution? No!

It's a first step to keep track of the products lifetime. Check it once daily or weekly and you know exactly how much you need to invest soon and what to replace next.

Like this you will, as long as you don't ingore it, not forget any of your products during your upcoming renewal cycle.

## Usage

`Foinix` was made for and tested with, the use with `Docker` and `Postgresql` as database.

Clone the repository locally.

```bash
docker pull ghcr.io/tautf/foinix
```

Run the container
```bash
docker run -d -p 3000:3000 -e DATABASE_URL="postgres://postgres:postgres@host.docker.internal:5432/postgres" --name=foinix foinix
```

Adjust `DATABASE_URL` to your database. Make sure to use `pg_bouncer` and connection pooling when using providers like `Supabase`.

In a future version i will provide a `Compose` file that handles the database as well.

## License

This product is licensed under MIT.
