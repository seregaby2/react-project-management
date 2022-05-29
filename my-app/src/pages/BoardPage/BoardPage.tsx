import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { LinearProgress } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import styles from './BoardPage.module.scss';
import {
  BoardControls,
  ButtonToMain,
  Column,
  ColumnModal,
  ConfirmError,
  ConfirmModal,
  TaskModal,
} from '../../components';
import {
  deleteColumnAsync,
  getColumnAsync,
  updateColumAsync,
} from '../../store/actions/columnsActions';
import { deleteTaskAsync, updateTaskAsync } from '../../store/actions/tasksActions';
import { tasksSlice } from '../../store/reducers/tasksSlice';
import { columnsSlice } from '../../store/reducers/columnsSlice';
import { useNavigate, useParams } from 'react-router-dom';

export const BoardPage = () => {
  const [createTask, setCreateTask] = useState(false);
  const [createColumn, setCreateColumn] = useState(false);
  const dispatch = useAppDispatch();
  const { isTokenActive } = useAppSelector((state) => state.reducerSingupRequest);
  const {
    columns,
    isLoading,
    error: columnError,
    isDeleteColumn,
    activeColumnId,
  } = useAppSelector((state) => state.reducerColumns);
  const {
    tasks,
    activeTaskColumnId,
    activeTaskId,
    isDeleteTask,
    error: taskError,
  } = useAppSelector((state) => state.reducerTasks);
  const { updateTaskDataState, deleteTaskFromState, setIsDeleteTask, clearTaskError } =
    tasksSlice.actions;
  const { updateColumState, setIsDeleteColumn, clearColumnError } = columnsSlice.actions;
  const { t } = useTranslation(['confirmModal']);
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { boards } = useAppSelector((state) => state.reducerBoards);
  const board = boards.find((board) => board.id === boardId);

  useEffect(() => {
    if (boardId) {
      dispatch(getColumnAsync(boardId));
    }
  }, [boardId, dispatch]);

  const handleDeleteColumn = () => {
    const deleteDataColumn = {
      boardId: boardId as string,
      columnId: activeColumnId,
    };
    dispatch(deleteColumnAsync(deleteDataColumn));
    dispatch(setIsDeleteColumn({ isDeleteColumn: false, activeColumnId: '' }));
  };

  const handleDeleteTask = () => {
    const dataToDelete = {
      boardId: boardId as string,
      columnId: activeTaskColumnId,
      taskId: activeTaskId,
    };
    dispatch(deleteTaskAsync(dataToDelete));
    dispatch(deleteTaskFromState(activeTaskId));
    dispatch(setIsDeleteTask({ isDeleteTask: false, activeTaskColumnId: '', activeTaskId: '' }));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const dataToUpdateColumn = {
        boardId: boardId as string,
        data: {
          id: columns[source.index].id,
          title: columns[source.index].title,
          order: columns[destination.index].order,
        },
      };
      dispatch(updateColumState(dataToUpdateColumn));
      dispatch(updateColumAsync(dataToUpdateColumn));
    }

    if (type === 'task') {
      const home = [...tasks]
        .filter((task) => task.columnId === source.droppableId)
        .sort((a, b) => (a.order as number) - (b.order as number));
      const foreign = [...tasks]
        .filter((task) => task.columnId === destination.droppableId)
        .sort((a, b) => (a.order as number) - (b.order as number));

      if (source.droppableId === destination.droppableId) {
        const dataToUpdateTask = {
          title: home[source.index].title,
          order: home[destination.index].order,
          description: home[source.index].description,
          userId: home[source.index].userId,
          boardId: home[source.index].boardId,
          columnId: home[source.index].columnId,
          id: home[source.index].id,
        };
        dispatch(
          updateTaskDataState({ task: dataToUpdateTask, columnId: home[source.index].columnId })
        );
        dispatch(updateTaskAsync(dataToUpdateTask));
      } else {
        const dataToUpdateTask = {
          title: home[source.index].title,
          order: destination.index === 0 ? 1 : (foreign[destination.index - 1].order as number) + 1,
          description: home[source.index].description,
          userId: home[source.index].userId,
          boardId: home[source.index].boardId,
          columnId: home[source.index].columnId,
          droppableColumnId: destination.droppableId,
          id: home[source.index].id,
        };
        dispatch(updateTaskAsync(dataToUpdateTask));

        dataToUpdateTask.columnId = destination.droppableId;
        dispatch(
          updateTaskDataState({ task: dataToUpdateTask, columnId: home[source.index].columnId })
        );
      }
    }
  };

  return (
    <main className={styles.boardPage}>
      {isLoading ? (
        <LinearProgress style={{ marginTop: '2vh', width: '100%', margin: '50px 0' }} />
      ) : (
        <>
          {columnError || taskError ? (
            <ConfirmError
              text={columnError || taskError}
              ClickOk={() => {
                columnError
                  ? dispatch(clearColumnError()) &&
                    (isTokenActive ? navigate('/main') : navigate('/'))
                  : dispatch(clearTaskError()) &&
                    (isTokenActive ? navigate('/main') : navigate('/'));
              }}
            />
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              {(isDeleteColumn || isDeleteTask) && (
                <ConfirmModal
                  text={isDeleteColumn ? t('deleteColumn') : t('deleteTask')}
                  onNo={() =>
                    isDeleteColumn
                      ? dispatch(setIsDeleteColumn({ isDeleteColumn: false, activeColumnId: '' }))
                      : dispatch(
                          setIsDeleteTask({
                            isDeleteTask: false,
                            activeTaskColumnId: '',
                            activeTaskId: '',
                          })
                        )
                  }
                  onYes={isDeleteColumn ? handleDeleteColumn : handleDeleteTask}
                />
              )}
              <ButtonToMain />
              <div className={styles.infoAboutBoard}>
                <h2>{board?.title}</h2>
                <p className={styles.description}>{board?.description}</p>
              </div>
              <BoardControls setCreateColumn={setCreateColumn} columns={columns} />
              {createTask && (
                <TaskModal setCreateTask={setCreateTask} boardId={boardId as string} />
              )}
              {createColumn && (
                <ColumnModal setCreateColumn={setCreateColumn} boardId={boardId as string} />
              )}
              {columns.length > 0 && (
                <Droppable droppableId="columns" direction="horizontal" type="column">
                  {(provided) => (
                    <div
                      className={styles.columnsContainer}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {columns.length > 0 &&
                        columns.map((column, index) => {
                          return (
                            <Column
                              index={index}
                              key={column.id}
                              columnId={column.id}
                              boardId={boardId as string}
                              title={column.title}
                              setCreateTask={setCreateTask}
                            />
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </DragDropContext>
          )}
        </>
      )}
    </main>
  );
};
