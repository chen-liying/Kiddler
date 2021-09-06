import axios from 'axios';
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DELETE_FAIL,
	ORDER_DELETE_REQUEST,
	ORDER_DELETE_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_ALL_FAIL,
	ORDER_LIST_ALL_REQUEST,
	ORDER_LIST_ALL_SUCCESS,
	ORDER_LIST_PROFILE_FAIL,
	ORDER_LIST_PROFILE_REQUEST,
	ORDER_LIST_PROFILE_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';

export const createOrderAction = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/orders`, order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetailsAction =
	(orderId) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_DETAILS_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(`/api/orders/${orderId}`, config);

			dispatch({
				type: ORDER_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ORDER_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const payOrderAction =
	(orderId, paymentResult) => async (dispatch, getState) => {
		console.log('Payment Result: ', paymentResult);

		try {
			dispatch({
				type: ORDER_PAY_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				config
			);

			dispatch({
				type: ORDER_PAY_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;

			dispatch({
				type: ORDER_PAY_FAIL,
				payload: message,
			});
		}
	};

export const listProfileOrdersAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_PROFILE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/myorders`, config);

		dispatch({
			type: ORDER_LIST_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: ORDER_LIST_PROFILE_FAIL,
			payload: message,
		});
	}
};

export const listAllOrdersAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_ALL_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders`, config);

		dispatch({
			type: ORDER_LIST_ALL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: ORDER_LIST_ALL_FAIL,
			payload: message,
		});
	}
};

export const deleteOrderAction = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/orders/${orderId}`, config);

		dispatch({
			type: ORDER_DELETE_SUCCESS,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: ORDER_DELETE_FAIL,
			payload: message,
		});
	}
};

export const deliverOrderAction = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/orders/${order._id}/deliver`,
			{},
			config
		);

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;

		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload: message,
		});
	}
};
