
const badWords = [
  // 'блядь',
  // 'хуй',
  // 'пиздец',
  // 'уебок',
  // 'хуйня',
  // 'ебанутые',
  // 'ебать',
  // 'бля',
  // 'охуеть',
  // 'блядский',
  // 'хуевый'
  'Михаил'
]

const replaceBadWords = (str) => {

  var newstr = str;
  badWords.map((item) => {
    newstr = newstr.split(item).join('😘')
  })

  return newstr;
};

export default replaceBadWords;
