import TextField from "@mui/material/TextField";

import styled from '@emotion/styled'
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-row: auto;
  max-width: 500px;
  padding: 16px;
`

const Calculator = () => {
    const [totalSavings, setTotalSavings] = useState(0);
    const [savingsGoal, setSavingsGoal] = useState(12500000);
    const [montlyInvestments, setMontlyInvestments] = useState(10000);
    const [costOfWhatYouWantToBuy, setCostOfWhatYouWantToBuy] = useState(500000);
    const [fireLoss, setFireLoss] = useState(0);
    const calculate = (initialValue:number) => {
        let princ = initialValue; // start deposit
        let add = montlyInvestments; // monthly deposit (need plus it every year)
        let rate = 7 / 100; // interest rate divided to create decimal
        let months = (300 * 12); //10 years of monthly contributions
        let currentMonth = 1;

        if (add >= savingsGoal) return 1;

        for (let i = 1; i <= months; i++) {
          princ += add;
          princ += princ * (rate / 12);
          if (princ >= savingsGoal){
            currentMonth = i;
            break;
          }
        }

        return currentMonth;

        // let monthIndex = 0;
        // do {
        //     princ += add;
        //     princ += princ * (rate / 12);
        //     monthIndex += 1;
        // }while(princ <= savingsGoal)
        // console.log(princ.toFixed(2)); //69636.12
        // console.log(monthIndex, " months. Years: ", monthIndex/12 )
        // return monthIndex;

        // const howLongItTakesWithoutBuying = totalSavings + montlyInvestments
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setter:any) => {
        setter(parseInt(event.target.value));
      };

    useEffect(() => {
        console.log(totalSavings);
        setFireLoss(calculate(totalSavings)-calculate(totalSavings-costOfWhatYouWantToBuy))
        // calculate(totalSavings)
    }, [totalSavings, costOfWhatYouWantToBuy, savingsGoal, montlyInvestments])
    // calculate(totalSavings);
    // calculate(totalSavings-costOfWhatYouWantToBuy)
    return <Wrapper>
        <TextField id="standard-basic" label="Total savings" variant="standard"  onChange={(e) => handleChange(e, setTotalSavings)} defaultValue={totalSavings}/>
        <TextField id="standard-basic" label="Savings goal" variant="standard" onChange={(e) => handleChange(e, setSavingsGoal)} defaultValue={savingsGoal} />
        <TextField id="standard-basic" onChange={(e) => handleChange(e, setMontlyInvestments)} label="Monthly investments" variant="standard"  defaultValue={montlyInvestments}/>
    <TextField id="standard-basic" onChange={(e) => handleChange(e, setCostOfWhatYouWantToBuy)} label="Cost of what you want to buy" variant="standard" defaultValue={costOfWhatYouWantToBuy}/>
    <span>FIRE LOSS: {fireLoss} Months / {fireLoss/12} Years</span></Wrapper>
  }
  
  export default Calculator;