type Props = {
  deleteAllCompleted: () => void;
};

export const TodoSummary = ({deleteAllCompleted}: Props) => {
  return (
    <div className="flex justify-end">
      <button onClick={deleteAllCompleted} className="textred-500 text-sm">
        完了したTodoを削除
      </button>
    </div>
  )
}