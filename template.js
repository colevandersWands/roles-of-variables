// intentionally no test cases
//  this isn't about behavior but 'static' analysis

console.log('--- original code ---');

{
  // snippet with single-letter variable names
  let a = 0;
  let b = '';
  let c = 14;
  let d = [];

  for (let e = 24; e > c; e--) {
    if ((a % 3) === 0) {
      b += a;
      d.push(b)
    }
    a -= a;
  }

  console.log(a, b, c, d)
}

console.log('--- single variable analyses ---');

  const profiles = { 
    a: {
      created: 'global',
      assigned: 'on declaration'
      type: 'number',
      read: 'condition & appending to b',
      modified: 'decremented in for loop',
      role: 'constant (value never changes)'
    },
    b: {
      created: 'global',
      assigned: 'on declaration'
      type: 'string',
      read: undefined,
      modified: 'appended to in if statement',
      role: 'aggregator'
    },
    c: {
      created: 'global',
      assigned: 'on declaration',
      type: 'number',
      read: 'for loop condition',
      modified: undefined,
      role: 'fixed value'
    },
    d: {
      created: 'global',
      assigned: 'on declaration',
      type: 'array',
      read: undefined,
      modified: 'pushed into with for loop',
      role: 'most wanted collector'
    },
    e: {
      created: 'for block',
      assigned: 'on declaration',
      type: 'number',
      read: 'in for statements',
      modified: 'by for loop',
      role: 'stepper'
    }
  }

  console.table(profiles)


console.log('--- role-based refactor ---')

{
  let a_constant = 0;
  let b_aggregator = '';
  const c_fixed = 14;
  const d_most_wanted = [];

  for (let e_stepper = 24; e_stepper > c_fixed; e_stepper--) {
    if ((a_constant % 3) === 0) {
      b_aggregator += a_stepper;
      d_most_wanted.push(b_aggregator)
    }
    a_constant -= a_constant;
  }

  console.log(a_constant, b_aggregator, c_fixed, d_most_wanted)
}

console.log('--- variable interactions ---')
  // make a log of every time two or more variables interact
  // is this step helpful? maybe it's not

{
  const interacts = []


  let a_constant = 0;
  let b_aggregator = '';
  const c_fixed = 14;
  const d_most_wanted = [];

  for (let e_stepper = 24; e_stepper > c_fixed; e_stepper--) {
    if ((a_constant % 3) === 0) {
      b_aggregator += a_constant; 
          interacts.push('a is concatenated to b')
      d_most_wanted.push(b_aggregator) 
          interacts.push('b is pushed into d')
    }
    a_constant -= a_constant;
  }

  console.log(a_constant, b_aggregator, c_fixed, d_most_wanted, interacts)
}
