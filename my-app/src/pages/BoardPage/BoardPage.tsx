import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { LinearProgress } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import {
  createTaskAsync,
  deleteTaskAsync,
  updateTaskAsync,
} from '../../store/actions/tasksActions';
import { tasksSlice } from '../../store/reducers/tasksSlice';

export const BoardPage = () => {
  const [createTask, setCreateTask] = useState(false);
  const [createColumn, setCreateColumn] = useState(false);
  const dispatch = useAppDispatch();
  const { columns, isLoading, error } = useAppSelector((state) => state.reducerColumns);
  const { tasks } = useAppSelector((state) => state.reducerTasks);
  const { deleteTaskFromState } = tasksSlice.actions;

  // TODO remove!!!!!
  const temporaryBoardID = 'fffa11f4-c201-46be-979e-5eef487c3547';

  useEffect(() => {
    dispatch(getColumnAsync(temporaryBoardID));
  }, []);

  const handleDeleteColumn = () => {
    const deleteDataColumn = {
      boardId: temporaryBoardID,
      columnId: activeColumnId,
    };
    dispatch(deleteColumnAsync(deleteDataColumn));
    dispatch(setIsDeleteColumn({ isDeleteColumn: false, activeColumnId: '' }));
  };

  const handleDeleteTask = () => {
    const dataToDelete = {
      boardId: temporaryBoardID,
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
        boardId: temporaryBoardID,
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
      //const foreign = [...tasks]
      //  .filter((task) => task.columnId === destination.droppableId)
      //  .sort((a, b) => (a.order as number) - (b.order as number));
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
        <DragDropContext onDragEnd={onDragEnd}>
          {isDeleteColumn && (
            <ConfirmModal
              text={t('deleteColumn')}
              onNo={() =>
                dispatch(setIsDeleteColumn({ isDeleteColumn: false, activeColumnId: '' }))
              }
              onYes={handleDeleteColumn}
            />
          )}
          {isDeleteTask && (
            <ConfirmModal
              text={t('deleteTask')}
              onNo={() =>
                dispatch(
                  setIsDeleteTask({ isDeleteTask: false, activeTaskColumnId: '', activeTaskId: '' })
                )
              }
              onYes={handleDeleteTask}
            />
          )}
          <ButtonToMain />
          <div className={styles.infoAboutBoard}>
            <h2>Board title</h2>
            <p className={styles.description}>
              Board description Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              inventore totam fugiat consectetur? Fugiat, quis! Dolore esse ullam aspernatur
              repudiandae, nesciunt dicta reprehenderit unde maxime facilis veniam itaque molestias
              excepturi?
            </p>
          </div>
          <BoardControls setCreateColumn={setCreateColumn} columns={columns} />
          {createTask && <TaskModal setCreateTask={setCreateTask} boardId={temporaryBoardID} />}
          {createColumn && (
            <ColumnModal setCreateColumn={setCreateColumn} boardId={temporaryBoardID} />
          )}
          {error && <h3 className={styles.errorMessage}>{error}. Tap to add column.</h3>}
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
                          boardId={temporaryBoardID}
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
    </main>
  );
};
