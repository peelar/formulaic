async function main() {
  const response = await fetch("http://localhost:3000/api/schema");
  const schema = await response.json();

  console.log(schema);
}

main();
