import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

function getSteps() {
	return ['Shopping Cart', 'Shipping', 'Payment Method', 'Review & Order'];
}

const CheckoutSteps = forwardRef((props, ref) => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	useEffect(() => {
		setActiveStep(props.stepsNumber);
	}, [props.stepsNumber]);

	useImperativeHandle(ref, () => ({
		handleNext() {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		},

		handleBack() {
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
		},

		handleReset() {
			setActiveStep(0);
		},
	}));

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
});

export default CheckoutSteps;
