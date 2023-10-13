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

`Foinix` was made for and tested with, the use with `Vercel` as hosting provider and `Supabase` as database. If you have trouble using another provider, please open an issue.

Clone the repository locally.

```
pnpm install
```

Create .env

```
cp .env.example .env
```

Adjust `DATABASE_URL` to your database. Make sure to use `pg_bouncer` and connection pooling when using `Supabase`.

Adjust `DATABASE_DIRECT_URL` to the direct database access connection string.

Deployment example with `Vercel CLI`

```
vercel --env DATABASE_URL=your-url-to-postgres
```

## License

This product is licensed under MIT.
