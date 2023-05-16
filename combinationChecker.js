while (true) {
  let combinationChecker = Math.floor(Math.random() * 1000000);
  let secret = 111111;
  console.log("Attempting match on", combinationChecker);

  if (combinationChecker === secret) {
    console.log("Match found!");
    break;
  }
}
