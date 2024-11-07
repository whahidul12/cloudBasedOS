function calculateBMI(event) {
  event.preventDefault();

  const heightFeet = parseInt(document.getElementById("heightFeet").value) || 0;
  const heightInches =
    parseInt(document.getElementById("heightInches").value) || 0;
  const weight = parseFloat(document.getElementById("weight").value);
  const resultText = document.getElementById("resultText");

  if (heightFeet >= 0 && heightInches >= 0 && weight > 0) {
    // Convert feet and inches to meters
    const heightMeters = (heightFeet * 12 + heightInches) * 0.0254;
    const bmi = (weight / (heightMeters * heightMeters)).toFixed(2);

    let status;
    if (bmi < 18.5) {
      status = "Underweight";
    } else if (bmi < 24.9) {
      status = "Normal weight";
    } else if (bmi < 29.9) {
      status = "Overweight";
    } else {
      status = "Obese";
    }

    resultText.innerHTML = `Your BMI is <strong>${bmi}</strong> (${status})`;
    resultText.style.color = status === "Normal weight" ? "#4caf50" : "#f44336";
  } else {
    resultText.textContent = "Please enter valid values.";
    resultText.style.color = "#f44336";
  }

  document.querySelector(".result").style.opacity = 1; // Fade in result
}
