# Word-Count-App

word count application with nodejs and angular

How’d you design the system architecture of this to support 1m daily active users, if all the users input were contributing to the frequency ?

```
  In such a case we can adopt different strategies according to arising usecases. The scaling here needs to be done for backend application and
  as well as for database. NodeJS itself is well suited for handling very large number of concurrent request and processing them fast, eventhough its single threaded (with help of its non-blocking request handling.). Still we can employ cloning or clustering of the application and a infrastructure level loadbalancer (like nginx) which can handle heavy request loads like this.
  To ensure data is not lost, its also an option to go for queueing the requests and processing with message queue subscribers which ensures not a single data is lost.

  Node is single threaded, but its backed by a database which is multithreaded. I would still choose mongodb for storing the data for this scenario, since it can scale well and it suits for a js system. Database sharding can be done to improve the performance. Indexing needs to be done. Also I might go for a thorough check on the db options available to improve the app logic.
```

If 2/3rds of the users came from the US, what changes would have to be made in the architecture to increase performance?

```
For this case also we will go for loadbalancing, but rather at a dns routing level. The application will be running in different cloud vms across the world, and I will go for a vendor like cloudflare which can offer geographic load balancing. With this, they route the requests to the nearest VM pools and will route to other region only on fallback.
```
