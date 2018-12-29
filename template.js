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

}

console.log('--- expanded code ---');

  // stopping here
  //  what if you notice (as with if_cond) that it is always the same
  //  refactor already?

{
  // snippet with single-letter variable names
  let a = 0;                    
  let b = '';
  let c = 14;
  let d = [];

  let e = 24;

  let while_cond = e > c;
  while (while_cond) {
    let if_cond = (a % 3) === 0;
    if (if_cond) {
      b += a;
      d.push(b);
    }
    a -= a;

    e--;
    while_cond = e > c;
  }

}

console.log('--- log variable use ---');
  // it may be too much to log when it's first assigned, and in what scopes
  //  it may be enough just to make them focus on variable use at all
  //  can figure out the rest on their own over time

{
  // snippet with single-letter variable names
  let a = 0;                            const a_profile = { 
                                                  declared: 'global',
                                                  assigned: ['declaration'], 
                                                  value: [0], read: []};
  let b = '';                           const b_profile = { 
                                                  declared: 'global',
                                                  assigned: ['declaration'], 
                                                  value: [''], read: []};
  let c = 14;                           const c_profile = { 
                                                  declared: 'global',
                                                  assigned: ['declaration'], 
                                                  value: [14], read: []};
  let d = [];                           const d_profile = { 
                                                  declared: 'global',
                                                  assigned: ['declaration'], 
                                                  value: [[]], read: []};
  let e = 24;                           const e_profile = { 
                                                  declared: 'global',
                                                  assigned: ['declaration'], 
                                                  value: [24], read: []};
                       
  let while_cond = e > c;               e_profile.read.push('while cond');
                                        c_profile.read.push('while cond');
  while (while_cond) {                           
    let if_cond = (a % 3) === 0;        a_profile.read.push('if cond');
    if (if_cond) {
      b += a;                           a_profile.read.push('ass to b');
                                        b_profile.assigned.push('in if');
                                        b_profile.value.push(b);
      d.push(b);                        b_profile.read.push('pushed to d');
                                        d_profile.assigned.push('in if');
                                        d_profile.value.push(d.slice());
    }
    a -= a;                             a_profile.read.push('subr a from a');
                                        a_profile.assigned.push('subtr a from a');
                                        a_profile.value.push(a);

    e--;                                e_profile.assigned.push('decrement');
                                        e_profile.value.push(e);
    while_cond = e > c;                 e_profile.read.push('while cond');
                                        c_profile.read.push('while cond');
  }

  console.log({
          a: a_profile,
          b: b_profile,
          c: c_profile,
          d: d_profile,
          e: e_profile
        });
}


console.log('--- role-based refactor ---')

{
  let a_stepper = 0;  // it may look like a constant, but that's just because it's inited at 0. with other vals it wouldn't be
  let b_aggregator = '';
  const c_fixed = 14;
  const d_most_wanted = [];

  for (let e_stepper = 24; e_stepper > c_fixed; e_stepper--) {
    if ((a_stepper % 3) === 0) {
      b_aggregator += a_stepper;
      d_most_wanted.push(b_aggregator)
    }
    a_stepper -= a_stepper;
  }

}










// ------- old ---------


// console.log('--- single variable analyses ---');

//   const profiles = { 
//     a: {
//       created: 'global',
//       assigned: 'on declaration'
//       type: 'number',
//       read: 'condition & appending to b',
//       modified: 'decremented in for loop',
//       role: 'constant (value never changes)'
//     },
//     b: {
//       created: 'global',
//       assigned: 'on declaration'
//       type: 'string',
//       read: undefined,
//       modified: 'appended to in if statement',
//       role: 'aggregator'
//     },
//     c: {
//       created: 'global',
//       assigned: 'on declaration',
//       type: 'number',
//       read: 'for loop condition',
//       modified: undefined,
//       role: 'fixed value'
//     },
//     d: {
//       created: 'global',
//       assigned: 'on declaration',
//       type: 'array',
//       read: undefined,
//       modified: 'pushed into with for loop',
//       role: 'most wanted collector'
//     },
//     e: {
//       created: 'for block',
//       assigned: 'on declaration',
//       type: 'number',
//       read: 'in for statements',
//       modified: 'by for loop',
//       role: 'stepper'
//     }
//   }

//   console.table(profiles)


// console.log('--- variable interactions ---')
//   // make a log of every time two or more variables interact
//   // is this step helpful? maybe it's not

// {
//   const interacts = []


//   let a_constant = 0;
//   let b_aggregator = '';
//   const c_fixed = 14;
//   const d_most_wanted = [];

//   for (let e_stepper = 24; e_stepper > c_fixed; e_stepper--) {
//     if ((a_constant % 3) === 0) {
//       b_aggregator += a_constant; 
//           interacts.push('a is concatenated to b')
//       d_most_wanted.push(b_aggregator) 
//           interacts.push('b is pushed into d')
//     }
//     a_constant -= a_constant;
//   }

//   console.log(a_constant, b_aggregator, c_fixed, d_most_wanted, interacts)
// }

