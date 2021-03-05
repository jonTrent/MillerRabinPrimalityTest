function randomBetweenBigInt( a, b ) {
  let range = b - a;
  let rawRandom = new Uint32Array( range.toString( 2 ).length / 32 + 1 );
  
  window.crypto.getRandomValues( rawRandom );

  let result = 0n;
  for ( let i = 0; i < rawRandom.length; i++ ) {
    result <<= 32n;
    result += BigInt( rawRandom[ i ] )
  }
  
  return a + result % ( range + 1n );
}


function powerModBigInt( b, e, m ) {
  let x = 1n;
  while ( 0n < e ) {
    if ( e % 2n === 1n ) {
      x = ( b * x ) % m;
    }
    b = ( b * b ) % m;
    e >>= 1n;
  }
  return x;
}


function likelyPrimeBigInt( n, k ) {
  if ( ! ( 2n < n || n % 2n === 0n ) ) {
    throw 'Error - Parameters must meet the following criteria: 2 < n, n is odd, 0 < k';
  }
 
	// Write (n - 1) as 2^r * d
  let r = 0n;
  let d = n - 1n;
	while (d % 2n === 0n) {
		d >>= 1n;
		r++;
	}
  
  WitnessLoop: while ( 0 < k-- ) {
    let a = randomBetweenBigInt( 2n, n - 1n );

    let x = powerModBigInt( a, d, n );
 
		if ( x === 1n || x === n - 1n ) {
      continue WitnessLoop;
    }
 
    let i = r - 1n;
    while ( 0 < i-- ) {
      x = ( x * x ) % n;
      if (x === 1)
        return false;
      if (x === n - 1n )
        continue WitnessLoop;
    }
    return false;   
	}
  
	return true;
}
