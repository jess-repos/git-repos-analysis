const yearNow = new Date().getFullYear()

const getYears = () => {
  let arr = []
  for (let i = 2011; i <= yearNow; i++) {
    arr.push(i)
  }
  return arr
}
export default getYears
