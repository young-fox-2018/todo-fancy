function populateDate(date){
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

module.exports = populateDate;
