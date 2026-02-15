
import React, { useState, useEffect } from 'react';
import { Task, Member, TaskStatus, Priority } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  members: Member[];
  initialTask?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, members, initialTask }) => {
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    assignedTo: members[0]?.id || '',
    dueDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        description: initialTask.description,
        status: initialTask.status,
        priority: initialTask.priority,
        assignedTo: initialTask.assignedTo,
        dueDate: initialTask.dueDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        assignedTo: members[0]?.id || '',
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialTask, isOpen, members]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: initialTask?.id || Math.random().toString(36).substr(2, 9),
      createdAt: initialTask?.createdAt || new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/80 backdrop-blur-sm p-0 md:p-4">
      <div className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom duration-300 md:animate-in md:fade-in md:zoom-in">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-[#0F172A] text-white">
          <h3 className="text-xl font-bold">{initialTask ? 'タスクを更新' : '新規タスク'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">タスク名</label>
            <input
              type="text"
              required
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="資料の作成、会議の設定など"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">詳細内容</label>
            <textarea
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 h-24 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="具体的な手順やメモ"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">担当者</label>
              <select
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 appearance-none"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              >
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">ステータス</label>
              <select
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 appearance-none"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
              >
                <option value="TODO">未着手</option>
                <option value="IN_PROGRESS">進行中</option>
                <option value="REVIEW">確認待ち</option>
                <option value="DONE">完了</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">優先度</label>
              <select
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 appearance-none"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
              >
                <option value="LOW">低</option>
                <option value="MEDIUM">中</option>
                <option value="HIGH">高</option>
                <option value="URGENT">至急</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">期限</label>
              <input
                type="date"
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div className="pt-6 flex gap-3 pb-8 md:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-[#0F172A] text-white font-bold rounded-2xl hover:bg-slate-800 shadow-xl transition-all active:scale-95"
            >
              タスクを確定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
