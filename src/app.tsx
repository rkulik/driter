import React, { useContext, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import Alert from './components/alert';
import Button from './components/button';
import Collapse, { Panel } from './components/collapse';
import Aside from './components/layout/aside';
import Container from './components/layout/container';
import Footer from './components/layout/footer';
import Main from './components/layout/main';
import Section from './components/layout/section';
import Snippet, { Clone, Handle } from './components/snippet';
import Textarea from './components/textarea';
import { SnackbarContext } from './contexts/snackbar';
import { Category } from './types';
import { addElement, moveElement, removeElement } from './utils/array';

const App = () => {
  const { t, i18n } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const snackbarProvider = useContext(SnackbarContext);
  const [stagedSnippets, setStagedSnippets] = useState<Category['snippets']>([]);
  const categories: Category[] = t('categories', { returnObjects: true });

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination?.droppableId !== 'stage') {
      // Snippet was not dragged onto the stage
      return;
    }

    const category = categories.find(({ label }) => label === source.droppableId);
    if (category) {
      // Snippet was dragged from categories onto the stage
      setStagedSnippets(addElement(stagedSnippets, category.snippets[source.index], destination.index));
    } else {
      // Snippet was moved within the stage
      setStagedSnippets(moveElement(stagedSnippets, source.index, destination.index));
    }
  };

  const copyTextToClipboard = () => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.value = stagedSnippets.join('\r\n\r\n');
    textareaRef.current.select();
    document.execCommand('copy');
    snackbarProvider.displaySnackbar(t('copied'));
  };

  return (
    <Container>
      <h1>Driter</h1>
      <Main>
        <DragDropContext onDragEnd={onDragEnd}>
          <Aside>
            <Collapse>
              {categories.map(({ label, snippets }) => (
                <Panel header={label} key={label}>
                  <Droppable droppableId={label} key={label} isDropDisabled={true}>
                    {provided => (
                      <div ref={provided.innerRef}>
                        <div style={{ display: 'none' }}>{provided.placeholder}</div>
                        {snippets.map((snippet, index) => (
                          <Draggable
                            key={`${label}-snippet-${index}`}
                            draggableId={`${label}-snippet-${index}`}
                            index={index}>
                            {(provided, snapshot) => (
                              <>
                                <Snippet
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  isDragging={snapshot.isDragging}
                                  style={provided.draggableProps.style}>
                                  {snippet}
                                </Snippet>
                                {snapshot.isDragging && <Clone>{snippet}</Clone>}
                              </>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                </Panel>
              ))}
            </Collapse>
          </Aside>
          <Section>
            <Droppable key="stage" droppableId="stage">
              {provided => (
                <div ref={provided.innerRef}>
                  {!stagedSnippets.length && <Alert message={t('emptySnippets')} type="warning" />}
                  {stagedSnippets.map((snippet, index) => (
                    <Draggable key={index} draggableId={`item${index}`} index={index}>
                      {(provided, snapshot) => (
                        <Snippet
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          isDragging={snapshot.isDragging}
                          style={provided.draggableProps.style}>
                          <div {...provided.dragHandleProps} style={{ width: '100%' }}>
                            {snippet}
                          </div>
                          <Handle
                            title={t('removeSnippet')}
                            onClick={() => setStagedSnippets(removeElement(stagedSnippets, index))}>
                            ✗
                          </Handle>
                        </Snippet>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Footer>
              <Button onClick={() => copyTextToClipboard()} title={t('copyTextToClipboard')}>
                <span role="img" aria-label="Copy">
                  💾
                </span>
              </Button>
              <Button onClick={() => changeLanguage('de')} title={t('switchToGerman')}>
                <span role="img" aria-label="German">
                  🇩🇪
                </span>
              </Button>
              <Button onClick={() => changeLanguage('en')} title={t('switchToEnglish')}>
                <span role="img" aria-label="English">
                  🇬🇧
                </span>
              </Button>
              <div>
                &copy; 2021 {t('by')} <a href="https://www.kulik.io/">René&nbsp;Kulik</a>. {t('allRightsReserved')}.
              </div>
            </Footer>
          </Section>
        </DragDropContext>
        <Textarea ref={textareaRef} />
      </Main>
    </Container>
  );
};

export default App;
