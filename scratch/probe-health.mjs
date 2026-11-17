async function check() {
  const r1 = await fetch('http://localhost:3000/');
  console.log('Homepage status:', r1.status);
  const text1 = await r1.text();
  console.log('Homepage HTML length:', text1.length);

  const r2 = await fetch('http://localhost:3000/os');
  console.log('OS status:', r2.status);
  const text2 = await r2.text();
  console.log('OS HTML length:', text2.length);

  // Extract CSS link
  const cssMatches = [...text2.matchAll(/href="(\/_next\/static\/css\/[^"]+)"/g)];
  console.log('Found CSS links:', cssMatches.length);
  for (const m of cssMatches) {
    const cssRes = await fetch('http://localhost:3000' + m[1]);
    console.log('CSS chunk', m[1], 'status:', cssRes.status);
  }
}
check().catch(console.error);
