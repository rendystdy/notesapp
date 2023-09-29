import { KeyboardAvoidingView, Platform, View } from 'react-native';
import React from 'react';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import dayjs from 'dayjs';

import { Container, Header } from '@components';
import { Colors } from '@constant';

import styles from './style';
import { useAppDispatch } from '@helpers';
import { Actions } from '@store';
import { NotesInterface } from '@interfaces';

interface ICreateNoteProps {
  route: any;
}

const CreateNote: React.FC<ICreateNoteProps> = ({ route }) => {

  const desc = route?.params?.desc;
  const id = route?.params?.id;
  const type = route?.params?.type;

  console.log('type', type);

  const setNewNoteDispatch = useAppDispatch(Actions.notesAction.setNewNote);
  const setUpdateNoteDispatch = useAppDispatch(Actions.notesAction.setUpdateNote);

  const richText = React.useRef();
  const [note, setNote] = React.useState<string>(desc ? desc : '');
  // const regex = /(<([^>]+)>)/ig;
  // // const result = note.replace(regex, '');

  const getTitle = () => {
    const reg = /<div>(.*?)<\/div>/g;
    const title: string[] = [];
    for (const match of note.matchAll(reg)) {
      title.push(match[1]);
    }
    return title[0];
  };

  const onPressDone = () => {
    if (type === 'edit') {
      console.log('edit');
      const payload: NotesInterface.INotes = {
        id: id,
        title: getTitle(),
        desc: note,
        timestamp: dayjs().format(),
      };

      return setUpdateNoteDispatch(payload);
    }

    const payload: NotesInterface.INotes = {
      id: dayjs().unix(),
      title: getTitle(),
      desc: note,
      timestamp: dayjs().format(),
    };

    return setNewNoteDispatch(payload);
  };

  return (
    <Container
      noPadding
      noScroll
      contentContainerStyle={ { backgroundColor: Colors.black.default } }>
      <Header onPressDone={ onPressDone } />
      <View style={ styles.container }>
        <RichToolbar
          style={ { backgroundColor: Colors.gray.dark, marginBottom: 12 } }
          editor={ richText }
          iconTint={ Colors.white.default }
          actions={ [actions.setBold, actions.setItalic, actions.setUnderline, actions.setStrikethrough, actions.setTextColor] }
        />
        <KeyboardAvoidingView
          behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
          style={ { flex: 1 } }>
          <RichEditor
            ref={ richText }
            placeholder='Description'
            useContainer={ false }
            initialContentHTML={ note }
            editorStyle={ { backgroundColor: Colors.gray.dark, color: Colors.white.default, placeholderColor: Colors.white.default } }
            androidLayerType='software'
            androidHardwareAccelerationDisabled
            onChange={ descriptionText => {
              setNote(descriptionText);
            } }
          />
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
};

export default CreateNote;
