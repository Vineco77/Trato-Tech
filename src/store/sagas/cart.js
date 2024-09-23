import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import cardsServices from "services/cards";
import flagsService from "services/flags";
import usersService from "services/users";
import {
  changeAmount,
  changeTotal,
  finishPayment,
  loadingPayment,
  resetCart,
  toggleCart,
} from "store/reducers/cart";
import { addUser } from "store/reducers/user";
import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

const userLogged = 2;

function* loadingPaymentSaga() {
  try {
    const user = yield call(usersService.searchForId, userLogged);
    const cards = yield call(cardsServices.searchForIdUsers, userLogged);
    const flagIds = cards.map((card) => card.flagId);
    const flags = yield call(flagsService.searchForId, flagIds);
    const cardsWithFlags = cards.map((card) => {
      const cardsFlag = flags.find((flag) => flag.id === card.flagId);
      return { ...card, tax: cardsFlag.tax, flag: cardsFlag.name };
    });
    yield put(addUser({ ...user, flags: cardsWithFlags }));
  } catch (e) {}
}

function* calculateTotal() {
  yield delay(500);
  const state = yield select();
  const total = state.cart.data.reduce((total, itemInTheCart) => {
    const item = state.items.find((item) => item.id === itemInTheCart.id);
    return total + item.price * itemInTheCart.amount;
  }, 0);
  yield put(changeTotal(total));
}

function* finishPaymentSaga({ payload }) {
  const { totalValue, paymentType } = payload;

  if (totalValue > paymentType.balance) {
    return yield toast({
      title: "Erro",
      description: "Saldo insuficiente",
      status: "error",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
  } else {
    yield toast({
      title: "Sucesso!",
      description: "Compra realizada com sucesso!",
      status: "success",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
    yield put(resetCart());
  }
}

export function* cartSaga() {
  yield takeLatest(loadingPayment, loadingPaymentSaga);
  yield takeEvery([changeAmount, toggleCart], calculateTotal);
  yield takeLatest(finishPayment, finishPaymentSaga);
}
