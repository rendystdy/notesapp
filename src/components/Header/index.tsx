import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';

import { Text } from '@components';
import { Colors } from '@constant';
import { NavigationHelper } from '@helpers';

interface IHeaderProps {
  type?: string;
  onPressDone?: () => void;
}

const Header: React.FC<IHeaderProps> = ({ type, onPressDone }) => {
  const RenderWithType = () => {
    switch (type) {
      case 'home':
        return (
          <View style={ styles.row }>
            <Text
              color={ Colors.yellow.default }
              weight='bold'
              style={ { letterSpacing: 1 } }
              size={ 32 }>Notes</Text>
            <Icons
              name='pencil-box'
              size={ 28 }
              onPress={ () => NavigationHelper.push('CreateNote') }
              color={ Colors.yellow.default } />
          </View>
        );
      default:
        return (
          <View style={ styles.row }>
            <IconsFontAwesome
              name='arrow-left'
              size={ 24 }
              onPress={ () => NavigationHelper.pop(1) }
              color={ Colors.yellow.default } />
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ onPressDone }>
              <Text
                color={ Colors.yellow.default }
                weight='bold'
                size={ 22 } >Done</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={ styles.container } >
      <RenderWithType />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    // backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Header;
