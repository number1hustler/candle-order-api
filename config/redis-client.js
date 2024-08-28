import redis from "redis";

let client = redis.createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  console.log("Connecting to Redis...");
  await client.connect();
  console.log("Connected to Redis");
})();

export { client };
