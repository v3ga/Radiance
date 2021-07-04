// --------------------------------
let styleDefs = 
[
  [0,1,2,3],
  [0,0,0,0],
  [0,0,1,1],
  [1,1,1,1],
  [1,3,3,3],
  [1,1,2,3],
  [0,2,3,3],
  [2,2,3,3],
  [0,0,0,1],
  [1,4,4,4],
  [1,4,5,5]
];

// --------------------------------
let transformDefs = 
[
  [0,1,2,3],
  [0,0,0,0],
  [0,1,0,1],
  [1,2,1,2],
  [1,2,2,2],
  [0,0,2,2],
  [2,2,3,3]
];

// --------------------------------
let color_schemes =
[
  {"id" : "cl", "name":"Classic", "background":"#000000", "stroke":"#FFFFFF", "fill":"#FFFFFF"},
  {"id" : "cc", "name":"Classic Coral","background":"#000000", "stroke":"#f95341", "fill":"#f95341"},
  {"id" : "s", "name":"Soft", "background":"#013a49", "stroke":"#FFFFFF", "fill":"#FFFFFF"},
  {"id" : "cs", "name":"Coral Soft", "background":"#013a49", "stroke":"#f95341", "fill":"#f95341"},
  {"id" : "cse", "name":"Coral Soft Extended", "background":"#013a49", "stroke":"#f95341", "fill":"#ffffff"},
  {"id" : "c", "name":"Coral", "background":"#f95341", "stroke":"#FFFFFF", "fill":"#FFFFFF"},
  {"id" : "e", "name":"Electric", "background":"#0000d6", "stroke":"#FFFFFF", "fill":"#FFFFFF"}
]


// --------------------------------
function transformAsStr(t)
{
  if (t == 0)           return "0°";
  else if (t == 1)       return "90°";
  else if (t == 2)       return "180°";
  else if (t == 3)       return "270°";
}

// --------------------------------
function motifAsStr(motif)
{
  if (motif == 0)       return "Linear";
  else if (motif == 1)  return "Arc";
  else if (motif == 2)  return "Zigzag";
  else if (motif == 3)  return "Square";
  else if (motif == 4)  return "Permutation";
  else if (motif == 5)  return "Duplo";
  return "?";
}

// --------------------------------
function random_dec() 
{
  seed ^= seed << 13
  seed ^= seed >> 17
  seed ^= seed << 5
  return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000;
}

// --------------------------------
function random_between(a, b) 
{
  return a + (b - a) * this.random_dec()
}

// --------------------------------
function random_int(a, b) 
{
  return Math.floor(this.random_between(a, b+1))
}


// --------------------------------
let seed            = parseInt(tokenData.hash.slice(0, 16), 16);

let allow_holes     = (random_between(0.0,1.0) <= 0.25) ? true : false;
let level_min       = 1;
let level_max       = level_min+random_int(1,3);
let r_subdivide     = random_between(0.1,0.4);
let freqPad         = random_between(0.25, 2);
let style           = styleDefs[ random_int(0,styleDefs.length-1) ];
let transform       = transformDefs[ random_int(0,transformDefs.length-1) ];
let has_shape       =  (random_between(0.0,1.0) <= 0.5) ? true : false;
let color_scheme_index  = random_int(0,color_schemes.length-1);
let color_scheme        = color_schemes[color_scheme_index];

// --------------------------------
features = 
[
  allow_holes ? "Holey" : "Full",
  level_max == 2 ? "Sparse" : level_max == 3 ? "Normal" : "Dense",
  color_scheme.name,
  style.map( motif => motifAsStr(motif) ).join(", "),
  freqPad <= 1.0 ? "Low Freq." : freqPad <=1.5 ? "Medium Freq." : "High Freq.",
  transform.map( t => transformAsStr(t) ).join(", ")
];
