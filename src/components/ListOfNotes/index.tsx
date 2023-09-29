import { FlatList, TouchableOpacity, View } from 'react-native';
import React from 'react';
// import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

import { Text } from '@components';

import style from './style';
import { Colors } from '@constant';
import { NotesInterface } from '@interfaces';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import dayjs from 'dayjs';
import { Actions } from '@store';

const ListOfNotes = () => {
  const listofnotes = useAppSelector(state => state.notesReducers.listofnotes);

  const removeItemNoteDispatch = useAppDispatch(Actions.notesAction.removeItemNote);
  const rowRefs = new Map();

  const onPressEdit = (item: NotesInterface.INotes) => {
    return NavigationHelper.push('CreateNote', { ...item, type: 'edit' });
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={ style.wrapperDelete }
      >
        <Text
          style={ style.textDelete }
        >
          Delete
        </Text>
      </View>
    );
  };

  const swipeFromRightOpen = (id: number) => {
    return removeItemNoteDispatch(id);
  };

  const getDesc = (desc: string) => {
    const reg = /<div>(.*?)<\/div>/g;
    const title: string[] = [];
    for (const match of desc.matchAll(reg)) {
      if (match[1] !== '<br>') {
        title.push(match[1]);
      }
    }
    return title[1];
  };

  const renderItem = ({ item }: NotesInterface.ItemNote) => {
    return (
      <Swipeable
        key={ item.id }
        ref={ ref => {
          if (ref && !rowRefs.get(item.id)) {
            rowRefs.set(item.id, ref);
          }
        } }
        renderRightActions={ rightSwipeActions }
        onSwipeableOpen={ () => {
          [...rowRefs.entries()].forEach(([key, ref]) => {
            if (key !== item.id && ref) { ref.close(); }
          });
          swipeFromRightOpen(item.id);
        } }
        friction={ 1 }
        enableTrackpadTwoFingerGesture
        rightThreshold={ 40 }

      >
        <RectButton
          activeOpacity={ 0.7 }
          onPress={ () => onPressEdit(item) }
          style={ style.content }
        >
          <Text
            color={ Colors.white.default }
            size={ 22 }>{ item.title }</Text>
          <View style={ [style.row, { marginTop: 6 }] }>
            <Text
              size={ 11 }
              style={ { marginRight: 10 } }
              color={ Colors.gray.default }>{ dayjs(item.timestamp).format('DD/MM/YYYY') }</Text>
            <Text
              color={ Colors.gray.default }
              size={ 14 }
              style={ { width: '75%' } }
              numberOfLines={ 1 }>{ getDesc(item.desc) }</Text>
          </View>
        </RectButton>
      </Swipeable>
    );
  };

  return (
    <View style={ style.container }>
      { /* <Text color={ Colors.white.default }>ListOfNotes</Text> */ }
      <FlatList
        data={ listofnotes }
        keyExtractor={ (_, i) => i.toString() }
        renderItem={ renderItem }
        ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
      />
    </View>
  );
};

export default ListOfNotes;
