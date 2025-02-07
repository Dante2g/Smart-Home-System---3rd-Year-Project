import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStore from './globalStore';

// sends post request to API to add a device
const AddDevice = async (props, params) => {
  const userId = await AsyncStorage.getItem('@user_id');

  fetch(`http://${globalStore.serverIP}:3333/device/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device_serial_number: params.device_serial_number,
      device_name: params.device_name,
      device_type: params.device_type,
      device_room: params.device_room,
      device_channel: params.device_channel,
      user_id: userId,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        ToastAndroid.show('Device Added', ToastAndroid.SHORT);
        props.navigation.goBack();
      }
      if (response.status === 400) {
        throw new Error('Failed Validation.');
      }
      if (response.status === 500) {
        throw new Error('Server Error.');
      } else if (response.status !== 201) {
        throw new Error('Something went wrong.');
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });
};

export default AddDevice;
