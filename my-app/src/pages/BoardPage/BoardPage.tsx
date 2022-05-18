import { LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BoardControls, Column, ColumnModal, TaskModal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumnAsync, updateColumAsync } from '../../store/actions/columnsActions';
import styles from './BoardPage.module.scss';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

export const BoardPage = () => {
  const [createTask, setCreateTask] = useState(false);
  const [createColumn, setCreateColumn] = useState(false);
  const dispatch = useAppDispatch();
  const { columns, isLoading, error } = useAppSelector((state) => state.reducerColumns);
  const [columnsState, setColumnsState] = useState(columns);

  // TODO remove!!!!!
  const temporaryBoardID = 'fee6b47e-3196-44bf-86c8-5cf888d9391b';

  useEffect(() => {
    dispatch(getColumnAsync(temporaryBoardID));
  }, []);

  const sortedColumns = [...columns];
  console.log(sortedColumns);
  console.log(columnsState);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const [reorderedColumn] = sortedColumns.splice(source.index, 1);
    sortedColumns.splice(destination.index, 0, reorderedColumn);
    //const sourseColumnOrder = sortedColumns[source.index].order;
    //const destinationColumnOrder = sortedColumns[destination.index].order;

    //console.log({ source: source.index }, { destination: destination.index });
    //console.log({ sourseColumnOrder }, { destinationColumnOrder });
  };

  return (
    <main className={styles.boardPage}>
      {isLoading ? (
        <LinearProgress style={{ marginTop: '2vh', width: '100%', margin: '50px 0' }} />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <h2>Board title</h2>
          <p className={styles.description}>
            Board description Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            inventore totam fugiat consectetur? Fugiat, quis! Dolore esse ullam aspernatur
            repudiandae, nesciunt dicta reprehenderit unde maxime facilis veniam itaque molestias
            excepturi?
          </p>
          <BoardControls setCreateColumn={setCreateColumn} columns={columns} />
          {createTask && <TaskModal setCreateTask={setCreateTask} boardId={temporaryBoardID} />}
          {createColumn && (
            <ColumnModal setCreateColumn={setCreateColumn} boardId={temporaryBoardID} />
          )}
          {error && <h3 className={styles.errorMessage}>{error}. Tap to add column.</h3>}

          {columns.length > 0 && (
            <Droppable droppableId="columns" direction="horizontal">
              {(provided) => (
                <div
                  className={styles.columnsContainer}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {sortedColumns.length > 0 &&
                    sortedColumns
                      .sort((a, b) => a.order - b.order)
                      .map((column, index) => {
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
