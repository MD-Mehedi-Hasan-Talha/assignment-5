export function leaderboardDataCustomizer(fullData) {
  let data = fullData?.map((item) => {
    let totalMark = 0;
    let totalCorrect = 0;
    for (let i = 0; i < item.correct_answers.length; i++) {
      const match = item.submitted_answers.find(
        (submitItem) =>
          submitItem.question_id === item.correct_answers[i].question_id
      );

      if (item.correct_answers[i].answer === match.answer) {
        totalMark += item.correct_answers[i].marks;
        totalCorrect++;
      }
    }

    return {
      ...item.user,
      totalMark,
      totalCorrect,
    };
  });

  let sortedData = [...data].sort((a, b) => b.totalMark - a.totalMark);

  let rank = 0;

  sortedData.forEach((user, index, array) => {
    if (index > 0 && user.totalMark === array[index - 1].totalMark) {
      user.rank = array[index - 1].rank;
    } else {
      user.rank = `${rank + 1}${getOrdinalSuffix(rank + 1)}`;
      rank++;
    }
  });

  return sortedData;
}

//Ordinal Suffix Function
function getOrdinalSuffix(rank) {
  const lastDigit = rank % 10;
  const lastTwoDigits = rank % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";
  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";
  return "th";
}
