import React, { Fragment } from 'react'
import AvaliableMeals from './AvaliableMeals'
import MealsSummary from './MealsSummary'

export default function Meals() {
  return (
    <div>
        <Fragment>
            
            <MealsSummary />
            <AvaliableMeals />

        </Fragment>
    </div>
  )
}
