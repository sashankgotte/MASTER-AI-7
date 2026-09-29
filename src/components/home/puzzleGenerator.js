/**
 * Infinite Procedural Puzzle Generator for MASTER AI 7 - PUZZLE
 * Supports 11 distinct puzzle categories scaling infinitely by difficulty level.
 */

// Deterministic Pseudo-Random Number Generator based on level and offset seed
export function seededRandom(level, offset = 0) {
  const seed = (level * 9301 + offset * 49297 + 233280) % 233280;
  return seed / 233280;
}

export function getDifficulty(level) {
  if (level <= 5) return { name: 'Easy', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
  if (level <= 15) return { name: 'Easy/Medium', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
  if (level <= 30) return { name: 'Medium', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
  if (level <= 60) return { name: 'Medium/Hard', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
  if (level <= 100) return { name: 'Hard', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' };
  return { name: 'Advanced', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' };
}

// Generate 4 plausible choices including the correct answer
function makeNumberChoices(correct, level, count = 4) {
  const set = new Set([correct]);
  let offset = 1;
  const spread = Math.max(2, Math.min(25, Math.floor(correct * 0.25) || 5));
  while (set.size < count) {
    const delta = Math.floor(seededRandom(level, offset * 7) * spread) + 1;
    const candidate = offset % 2 === 0 ? correct + delta : correct - delta;
    if (candidate > 0 && candidate !== correct) {
      set.add(candidate);
    } else {
      set.add(correct + offset * 2);
    }
    offset++;
  }
  return [...set].sort(() => seededRandom(level, offset) - 0.5);
}

function makeTextChoices(correct, wrongPool, level, count = 4) {
  const set = new Set([correct]);
  let offset = 1;
  while (set.size < count && offset < wrongPool.length + 10) {
    const idx = Math.floor(seededRandom(level, offset * 5) * wrongPool.length);
    if (wrongPool[idx] && wrongPool[idx] !== correct) {
      set.add(wrongPool[idx]);
    }
    offset++;
  }
  // Fillers if needed
  let fallbackIdx = 1;
  while (set.size < count) {
    set.add(`Option ${fallbackIdx++}`);
  }
  return [...set].sort(() => seededRandom(level, 99) - 0.5);
}

// 1. NUMBER SEQUENCES
function generateNumberSequence(level) {
  const diffTier = Math.floor((level - 1) / 5);
  const mode = Math.floor(seededRandom(level, 1) * 6);

  if (mode === 0 || level <= 3) {
    // Arithmetic: a, a+d, a+2d, a+3d, ?
    const d = 2 + Math.floor(seededRandom(level, 2) * (3 + diffTier * 2));
    const a = 1 + Math.floor(seededRandom(level, 3) * (5 + diffTier * 3));
    const seq = [a, a + d, a + 2 * d, a + 3 * d];
    const answer = a + 4 * d;
    return {
      category: 'Number Sequence',
      badge: 'NUMERICAL',
      title: 'Find the Next Number',
      description: 'Analyze the progression pattern between numbers to determine the missing value.',
      sequenceDisplay: [...seq, '?'],
      explanation: `Each number increases by adding ${d} (${seq[0]} + ${d} = ${seq[1]}, etc.). Next is ${seq[3]} + ${d} = ${answer}.`,
      choices: makeNumberChoices(answer, level),
      answer
    };
  }

  if (mode === 1) {
    // Second-order differences: +2, +4, +6, +8
    const base = 2 + Math.floor(seededRandom(level, 4) * 5);
    const stepDiff = 2 + Math.floor(seededRandom(level, 5) * (1 + Math.min(4, diffTier)));
    let current = base;
    const seq = [current];
    for (let i = 1; i <= 4; i++) {
      current += i * stepDiff;
      seq.push(current);
    }
    const answer = current + 5 * stepDiff;
    return {
      category: 'Number Sequence',
      badge: 'DELTA SERIES',
      title: 'Accelerating Sequence',
      description: 'The gap between numbers increases by a constant step at every stage.',
      sequenceDisplay: [...seq, '?'],
      explanation: `The differences between numbers grow by +${stepDiff} each time. Therefore, the next term is ${seq[seq.length - 1]} + ${5 * stepDiff} = ${answer}.`,
      choices: makeNumberChoices(answer, level),
      answer
    };
  }

  if (mode === 2) {
    // Alternating sequences: +a, -b, +a, -b
    const stepUp = 4 + Math.floor(seededRandom(level, 6) * 6);
    const stepDown = 2 + Math.floor(seededRandom(level, 7) * 3);
    let val = 10 + Math.floor(seededRandom(level, 8) * 15);
    const seq = [val];
    for (let i = 0; i < 4; i++) {
      val = i % 2 === 0 ? val + stepUp : val - stepDown;
      seq.push(val);
    }
    const answer = seq.length % 2 === 1 ? seq[seq.length - 1] + stepUp : seq[seq.length - 1] - stepDown;
    return {
      category: 'Number Sequence',
      badge: 'ALTERNATING',
      title: 'Two-Track Sequence',
      description: 'Observe the alternating pattern of addition and subtraction.',
      sequenceDisplay: [...seq, '?'],
      explanation: `The sequence alternates: add ${stepUp}, subtract ${stepDown}. Following this rule, the next number is ${answer}.`,
      choices: makeNumberChoices(answer, level),
      answer
    };
  }

  if (mode === 3) {
    // Fibonacci style: x, y, x+y, x+2y, ...
    const a = 1 + Math.floor(seededRandom(level, 9) * 4);
    const b = 2 + Math.floor(seededRandom(level, 10) * 4);
    const seq = [a, b, a + b, a + 2 * b, 2 * a + 3 * b];
    const answer = seq[3] + seq[4];
    return {
      category: 'Number Sequence',
      badge: 'FIBONACCI',
      title: 'Sum-of-Previous Sequence',
      description: 'Each term after the first two is the sum of the two preceding numbers.',
      sequenceDisplay: [...seq, '?'],
      explanation: `Each number is the sum of the two before it (${seq[3]} + ${seq[4]} = ${answer}).`,
      choices: makeNumberChoices(answer, level),
      answer
    };
  }

  if (mode === 4) {
    // Multiplicative / Geometric with offset: *2 + 1 or *2 - 1
    const mult = 2;
    const add = (level % 2 === 0) ? 1 : -1;
    let val = 2 + (level % 4);
    const seq = [val];
    for (let i = 0; i < 4; i++) {
      val = val * mult + add;
      seq.push(val);
    }
    const answer = val * mult + add;
    return {
      category: 'Number Sequence',
      badge: 'GEOMETRIC',
      title: 'Multiplier Logic',
      description: 'Each number is derived by multiplying the previous by 2 and adding a constant.',
      sequenceDisplay: [...seq, '?'],
      explanation: `Rule: (Current × ${mult}) ${add >= 0 ? '+' : ''}${add}. Thus: ${val} × ${mult} ${add >= 0 ? '+' : ''}${add} = ${answer}.`,
      choices: makeNumberChoices(answer, level),
      answer
    };
  }

  // Squares / Cubes with offset
  const offset = 1 + (level % 5);
  const startN = 2 + (level % 3);
  const seq = Array.from({ length: 4 }, (_, i) => Math.pow(startN + i, 2) + offset);
  const answer = Math.pow(startN + 4, 2) + offset;
  return {
    category: 'Number Sequence',
    badge: 'EXPONENTIAL',
    title: 'Square Numbers Pattern',
    description: 'Each number corresponds to n² + constant.',
    sequenceDisplay: [...seq, '?'],
    explanation: `The numbers are ${(startN)}² + ${offset} = ${seq[0]}, ${(startN + 1)}² + ${offset} = ${seq[1]}, etc. Next is ${(startN + 4)}² + ${offset} = ${answer}.`,
    choices: makeNumberChoices(answer, level),
    answer
  };
}

// 2. PATTERN RECOGNITION (3x3 Matrix Grid)
function generatePatternMatrix(level) {
  const themes = [
    { symbols: ['▲', '■', '●', '✦'], label: 'Geometric Symbols' },
    { symbols: ['⚡', '🔥', '💧', '🌿'], label: 'Element Tokens' },
    { symbols: ['1', '2', '3', '4'], label: 'Numeric Values' },
    { symbols: ['💎', '💠', '🔷', '🔶'], label: 'Cyber Crystals' }
  ];
  const theme = themes[level % themes.length];
  const s = theme.symbols;

  // Rule: Latin square / row shift
  const shift = 1 + (level % 2);
  const grid = [
    [s[0], s[1], s[2]],
    [s[(0 + shift) % 3], s[(1 + shift) % 3], s[(2 + shift) % 3]],
    [s[(0 + 2 * shift) % 3], s[(1 + 2 * shift) % 3], '?']
  ];
  const answer = s[(2 + 2 * shift) % 3];
  const choices = [s[0], s[1], s[2], s[3]].sort(() => seededRandom(level, 12) - 0.5);

  return {
    category: 'Pattern Recognition',
    badge: '3×3 MATRIX',
    title: 'Matrix Completion',
    description: 'Find the symbol that correctly finishes the 3×3 matrix row and column logic.',
    gridDisplay: grid,
    explanation: `Each row and column contains unique symbols shifting systematically. The missing symbol is "${answer}".`,
    choices,
    answer
  };
}

// 3. SHAPE & ROTATION SEQUENCES
function generateShapeSequence(level) {
  const sets = [
    {
      seq: ['⬆️', '↗️', '➡️', '↘️'],
      next: '⬇️',
      wrong: ['⬅️', '↖️', '⬆️', '↙️'],
      desc: 'Clockwise 45° arrow rotation'
    },
    {
      seq: ['🕐 1:00', '🕒 3:00', '🕔 5:00', '🕖 7:00'],
      next: '🕘 9:00',
      wrong: ['🕙 10:00', '🕚 11:00', '🕕 6:00', '🕗 8:00'],
      desc: 'Clock advancing by 2 hours every interval'
    },
    {
      seq: ['🔺 Triangle (3)', '◻️ Square (4)', '⬟ Pentagon (5)', '⬡ Hexagon (6)'],
      next: '🛑 Heptagon (7)',
      wrong: ['⚪ Circle (0)', '⭐️ Star (10)', '🔶 Octagon (8)', '◼️ Square (4)'],
      desc: 'Geometric polygon with increasing number of sides (+1 side)'
    },
    {
      seq: ['🟢 Circle', '🟢🟢 2 Circles', '🟢🟢🟢 3 Circles', '🟢🟢🟢🟢 4 Circles'],
      next: '🟢🟢🟢🟢🟢 5 Circles',
      wrong: ['🟢🟢 2 Circles', '🟢🟢🟢🟢 4 Circles', '🟢🟢🟢🟢🟢🟢 6 Circles', '🔴 Red Circle'],
      desc: 'Count expansion progression'
    },
    {
      seq: ['🌑 New', '🌒 Waxing Crescent', '🌓 First Quarter', '🌔 Waxing Gibbous'],
      next: '🌕 Full Moon',
      wrong: ['🌘 Waning Crescent', '🌑 New Moon', '🌗 Last Quarter', '🌖 Waxing Gibbous'],
      desc: 'Lunar phase cycle'
    }
  ];

  const selected = sets[level % sets.length];
  const choices = makeTextChoices(selected.next, selected.wrong, level, 4);

  return {
    category: 'Shape Sequence',
    badge: 'ROTATION & FORM',
    title: 'Geometric Transformation',
    description: selected.desc,
    sequenceDisplay: [...selected.seq, '?'],
    explanation: `Following the transformation rule (${selected.desc}), the missing shape is "${selected.next}".`,
    choices,
    answer: selected.next
  };
}

// 4. MISSING PIECE PUZZLES
function generateMissingPiece(level) {
  const pieces = [
    {
      top: ['🔴', '🔷', '⭐'],
      mid: ['⭐', '🔴', '🔷'],
      bot: ['🔷', '⭐', '?'],
      answer: '🔴',
      wrong: ['⭐', '🔷', '🟢', '🟨'],
      title: 'Sudoku-Style Symbol Grid'
    },
    {
      top: ['2', '4', '8'],
      mid: ['3', '6', '12'],
      bot: ['5', '10', '?'],
      answer: '20',
      wrong: ['15', '25', '18', '30'],
      title: 'Row Multiplier Grid (×2)'
    },
    {
      top: ['3', '5', '8'],
      mid: ['4', '7', '11'],
      bot: ['6', '8', '?'],
      answer: '14',
      wrong: ['12', '15', '16', '18'],
      title: 'Row Sum Logic (A + B = C)'
    },
    {
      top: ['▲', '▲▲', '▲▲▲'],
      mid: ['●', '●●', '●●●'],
      bot: ['■', '■■', '?'],
      answer: '■■■',
      wrong: ['■', '■■', '▲▲▲', '●●●'],
      title: 'Quantity Grid Progression'
    }
  ];

  const item = pieces[level % pieces.length];
  const grid = [item.top, item.mid, item.bot];
  const choices = makeTextChoices(item.answer, item.wrong, level, 4);

  return {
    category: 'Missing Piece',
    badge: 'LOGIC GRID',
    title: item.title,
    description: 'Identify the missing piece from the 3×3 matrix according to horizontal relationships.',
    gridDisplay: grid,
    explanation: `Examining each row's internal rule, the value that replaces "?" is "${item.answer}".`,
    choices,
    answer: item.answer
  };
}

// 5. LOGICAL REASONING (Deductive Brain Teasers)
function generateLogicalReasoning(level) {
  const scenarios = [
    {
      question: 'Four runners (Leo, Maya, Sam, and Zoe) finish a race: Leo finished ahead of Maya. Maya finished ahead of Sam. Zoe finished ahead of Leo. Who finished in 1st place?',
      answer: 'Zoe',
      wrong: ['Leo', 'Maya', 'Sam', 'Tie'],
      explanation: 'Ranking from first to last: Zoe > Leo > Maya > Sam. Zoe finished first.'
    },
    {
      question: 'If all Bloops are Razzies, and all Razzies are Lizzies, are all Bloops definitely Lizzies?',
      answer: 'Yes, definitely',
      wrong: ['No, never', 'Only sometimes', 'Cannot be determined'],
      explanation: 'By transitivity of categorical syllogisms: Bloops ⊂ Razzies ⊂ Lizzies. Therefore all Bloops are Lizzies.'
    },
    {
      question: 'A wall clock runs 10 minutes slow. At 5:00 PM real time, the clock shows 4:50 PM. When the slow clock shows 7:20 PM, what is the actual real time?',
      answer: '7:30 PM',
      wrong: ['7:10 PM', '7:20 PM', '7:40 PM', '8:00 PM'],
      explanation: 'Since the clock is 10 minutes behind, the actual time is 10 minutes ahead: 7:20 PM + 10 mins = 7:30 PM.'
    },
    {
      question: 'In a group of friends, Sarah is taller than Brian. Brian is taller than Kevin. Diana is taller than Sarah. Who is the shortest person in the group?',
      answer: 'Kevin',
      wrong: ['Diana', 'Sarah', 'Brian'],
      explanation: 'Heights in descending order: Diana > Sarah > Brian > Kevin. Kevin is the shortest.'
    },
    {
      question: 'A light switch panel has 3 switches (A, B, C). Turning on A & B lights up the green lamp. Turning on B & C lights up the yellow lamp. Turning on only B lights up nothing. Which switch is responsible for the green lamp?',
      answer: 'Switch A',
      wrong: ['Switch B', 'Switch C', 'Both A and C'],
      explanation: 'Since switch B alone lights nothing, Switch A is the decisive factor for the green lamp.'
    }
  ];

  const item = scenarios[level % scenarios.length];
  const choices = makeTextChoices(item.answer, item.wrong, level, 4);

  return {
    category: 'Logical Reasoning',
    badge: 'DEDUCTION',
    title: 'Deductive Problem',
    description: item.question,
    explanation: item.explanation,
    choices,
    answer: item.answer
  };
}

// 6. ODD-ONE-OUT
function generateOddOneOut(level) {
  const challenges = [
    {
      items: ['17', '23', '29', '35', '41'],
      answer: '35',
      hint: 'Inspect divisibility and prime properties.',
      explanation: '35 is a composite number (5 × 7), while 17, 23, 29, and 41 are all prime numbers.'
    },
    {
      items: ['16', '25', '36', '48', '64'],
      answer: '48',
      hint: 'Look for perfect square roots.',
      explanation: '16 (4²), 25 (5²), 36 (6²), and 64 (8²) are perfect squares. 48 is not a perfect square.'
    },
    {
      items: ['H', 'I', 'O', 'X', 'F'],
      answer: 'F',
      hint: 'Examine symmetrical axes.',
      explanation: 'H, I, O, and X possess both vertical and horizontal symmetry. The letter F has no symmetry.'
    },
    {
      items: ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Earth'],
      answer: 'Jupiter',
      hint: 'Categorize by planetary composition.',
      explanation: 'Jupiter is a Gas Giant, whereas Mercury, Venus, Earth, and Mars are terrestrial (rocky) planets.'
    },
    {
      items: ['24', '36', '42', '55', '60'],
      answer: '55',
      hint: 'Check divisibility by common factors.',
      explanation: '24, 36, 42, and 60 are all even numbers and divisible by 6. 55 is odd and not divisible by 6.'
    },
    {
      items: ['Byte', 'Kilobyte', 'Megabyte', 'Gigahertz', 'Terabyte'],
      answer: 'Gigahertz',
      hint: 'Identify what unit is being measured.',
      explanation: 'Gigahertz measures clock frequency / processor speed, while the others measure digital data storage capacity.'
    }
  ];

  const item = challenges[level % challenges.length];

  return {
    category: 'Odd One Out',
    badge: 'ANOMALY DETECTOR',
    title: 'Spot the Exception',
    description: `Four of these items share a strict logical or mathematical rule. Select the one item that does NOT fit:`,
    hint: item.hint,
    choices: item.items,
    explanation: item.explanation,
    answer: item.answer
  };
}

// 7. MEMORY CHALLENGE (Interactive pattern recall)
function generateMemoryChallenge(level) {
  const symbolPool = ['💎', '⚡', '🔥', '🌟', '🔮', '🍀', '🚀', '🎯', '🧩'];
  const count = Math.min(3 + Math.floor(level / 8), 6);
  
  // Pick unique symbols
  const shuffled = [...symbolPool].sort(() => seededRandom(level, 3) - 0.5);
  const targetSymbols = shuffled.slice(0, count);
  const targetIndex = Math.floor(seededRandom(level, 9) * count);
  const target = targetSymbols[targetIndex];

  const question = `Remember the symbols. Which symbol appeared at Position #${targetIndex + 1}?`;
  const choices = makeTextChoices(target, symbolPool.filter(s => s !== target), level, 4);

  return {
    category: 'Memory Challenge',
    badge: 'FLASH RECALL',
    title: 'Visual Memory Retention',
    description: question,
    isMemory: true,
    memoryItems: targetSymbols,
    memoryQuestion: `Which symbol was at Position ${targetIndex + 1}?`,
    explanation: `Position ${targetIndex + 1} held the symbol "${target}".`,
    choices,
    answer: target
  };
}

// 8. MATCHING PUZZLES / LOGIC ANALOGIES
function generateMatchingPuzzle(level) {
  const analogies = [
    {
      prompt: 'Circle is to Sphere as Square is to: ?',
      answer: 'Cube',
      wrong: ['Triangle', 'Pyramid', 'Rectangle', 'Prism'],
      explanation: 'A circle is a 2D projection of a 3D sphere. A square is a 2D projection of a 3D cube.'
    },
    {
      prompt: 'Byte is to 8 Bits as Kilobyte (KB) is to: ?',
      answer: '1,024 Bytes',
      wrong: ['100 Bytes', '1,000 Bits', '64 Bytes', '512 Bits'],
      explanation: 'In binary computer architecture, 1 Kilobyte is defined as 2¹⁰ = 1,024 Bytes.'
    },
    {
      prompt: 'Neural Network is to Synapse as Computer is to: ?',
      answer: 'Transistor',
      wrong: ['Monitor', 'Keyboard', 'Mouse', 'Printer'],
      explanation: 'Synapses are the fundamental connection/switch units in biological neural nets, analogous to transistors in computers.'
    },
    {
      prompt: 'Perimeter of a square is 36 cm. What is its Area?',
      answer: '81 cm²',
      wrong: ['36 cm²', '72 cm²', '64 cm²', '100 cm²'],
      explanation: 'Side = 36 / 4 = 9 cm. Area = side² = 9 × 9 = 81 cm².'
    }
  ];

  const item = analogies[level % analogies.length];
  const choices = makeTextChoices(item.answer, item.wrong, level, 4);

  return {
    category: 'Matching Puzzle',
    badge: 'ANALOGY & CORRESPONDENCE',
    title: 'Logical Proportions',
    description: item.prompt,
    explanation: item.explanation,
    choices,
    answer: item.answer
  };
}

// 9. VISUAL REASONING (Balance Scales & Spatial Logic)
function generateVisualReasoning(level) {
  const scales = [
    {
      prompt: 'Scale 1: 2 🔷 = 1 🔶\nScale 2: 1 🔶 = 3 🟢\nQuestion: How many 🟢 balance 4 🔷?',
      answer: '6 🟢',
      wrong: ['4 🟢', '5 🟢', '8 🟢', '3 🟢'],
      explanation: 'Since 2 🔷 = 1 🔶 = 3 🟢, then 1 🔷 = 1.5 🟢. Thus 4 🔷 = 4 × 1.5 = 6 🟢.'
    },
    {
      prompt: 'Scale 1: 1 🍎 + 1 🍐 = 100g\nScale 2: 1 🍎 = 1 🍐 + 20g\nQuestion: How much does 1 🍎 weigh?',
      answer: '60g',
      wrong: ['50g', '70g', '40g', '80g'],
      explanation: 'Substitute: (1 🍐 + 20g) + 1 🍐 = 100g → 2 🍐 = 80g → 🍐 = 40g. So 🍎 = 40g + 20g = 60g.'
    },
    {
      prompt: 'Scale 1: 3 ⭐️ = 2 🌙\nScale 2: 1 🌙 = 3 ☀️\nQuestion: How many ☀️ equal 3 ⭐️?',
      answer: '6 ☀️',
      wrong: ['4 ☀️', '5 ☀️', '9 ☀️', '3 ☀️'],
      explanation: '3 ⭐️ = 2 🌙. Since 1 🌙 = 3 ☀️, then 2 🌙 = 6 ☀️. Therefore 3 ⭐️ = 6 ☀️.'
    }
  ];

  const item = scales[level % scales.length];
  const choices = makeTextChoices(item.answer, item.wrong, level, 4);

  return {
    category: 'Visual Reasoning',
    badge: 'BALANCE SCALE',
    title: 'Equilibrium Deduction',
    description: item.prompt,
    explanation: item.explanation,
    choices,
    answer: item.answer
  };
}

// 10. SIMPLE MATHEMATICAL LOGIC (Fruit / Symbol Algebra)
function generateMathLogic(level) {
  const mult = 1 + (level % 4);
  const a = 3 + (level % 5);
  const b = 2 + ((level + 1) % 4);
  const c = 1 + ((level + 2) % 3);

  const eq1 = `${a} + ${a} + ${a} = ${3 * a}`;
  const eq2 = `${a} + ${b} + ${b} = ${a + 2 * b}`;
  const eq3 = `${b} × ${c} = ${b * c}`;
  const finalVal = c + a * b; // order of operations: c + (a * b)

  const puzzleText = `
    🍎 + 🍎 + 🍎 = ${3 * a}
    🍎 + 🍌 + 🍌 = ${a + 2 * b}
    🍌 × 🍇 = ${b * c}
    🍇 + 🍎 × 🍌 = ?
  `;

  const choices = makeNumberChoices(finalVal, level, 4);

  return {
    category: 'Math Logic',
    badge: 'SYMBOL ALGEBRA',
    title: 'Symbolic Equations',
    description: 'Solve the system of equations. Note the standard order of operations (multiplication first)!',
    mathDisplay: puzzleText,
    explanation: `From Eq 1: 🍎 = ${a}. From Eq 2: 🍌 = ${b}. From Eq 3: 🍇 = ${c}. Final: ${c} + (${a} × ${b}) = ${c} + ${a * b} = ${finalVal}.`,
    choices,
    answer: finalVal
  };
}

// 11. BRAIN TEASERS (Lateral Thinking & Deduction)
function generateBrainTeasers(level) {
  const teasers = [
    {
      question: 'A farmer has 17 sheep. A sudden storm causes all but 9 of them to run away. How many sheep are still left on the farm?',
      answer: '9',
      wrong: ['8', '17', '0', '10'],
      explanation: 'The riddle states "all but 9" ran away. That means exactly 9 sheep remained!'
    },
    {
      question: 'If you are running in a marathon and you overtake the person in second place, what position are you in now?',
      answer: '2nd place',
      wrong: ['1st place', '3rd place', '4th place'],
      explanation: 'You took the place of the person who was second, so you are now in 2nd place!'
    },
    {
      question: 'A water lily in a pond doubles in surface area every day. If it takes 48 days to cover the entire pond, on what day does it cover exactly half the pond?',
      answer: 'Day 47',
      wrong: ['Day 24', 'Day 46', 'Day 40', 'Day 12'],
      explanation: 'Since it doubles every single day, on Day 47 it was half full, and one day later (Day 48) it doubled to completely fill the pond.'
    },
    {
      question: 'How many months in the calendar year have 28 days?',
      answer: 'All 12 months',
      wrong: ['Only 1 (February)', '6 months', '4 months', 'None'],
      explanation: 'Every single month of the year has at least 28 days!'
    },
    {
      question: 'If 5 machines take 5 minutes to make 5 widgets, how many minutes will 100 machines take to make 100 widgets?',
      answer: '5 minutes',
      wrong: ['100 minutes', '20 minutes', '1 minute', '500 minutes'],
      explanation: 'Each machine takes 5 minutes to make 1 widget. With 100 machines running simultaneously, 100 widgets still take 5 minutes!'
    }
  ];

  const item = teasers[level % teasers.length];
  const choices = makeTextChoices(item.answer, item.wrong, level, 4);

  return {
    category: 'Brain Teaser',
    badge: 'LATERAL THINKING',
    title: 'Lateral Logic Trap',
    description: item.question,
    explanation: item.explanation,
    choices,
    answer: item.answer
  };
}

// Master generator picking from the 11 categories based on level
export function generatePuzzleForLevel(level) {
  const categoryIndex = (level - 1) % 11;
  const generators = [
    generateNumberSequence,   // 0
    generatePatternMatrix,    // 1
    generateMathLogic,        // 2
    generateOddOneOut,        // 3
    generateShapeSequence,    // 4
    generateLogicalReasoning, // 5
    generateMissingPiece,     // 6
    generateMemoryChallenge,  // 7
    generateMatchingPuzzle,   // 8
    generateVisualReasoning,  // 9
    generateBrainTeasers      // 10
  ];

  const puzzle = generators[categoryIndex](level);
  puzzle.level = level;
  puzzle.difficulty = getDifficulty(level);
  return puzzle;
}
