
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const LessonForm = ({ onSave, onCancel, lessonNumber, initialData = null }) => {
  const { darkMode } = useContext(ThemeContext);
  const [lessonData, setLessonData] = useState(initialData || {
    title: '',
    description: '',
    duration: '',
    video_url: '',
    thumbnail: null,
    points: 0
  });
  const [previewImage, setPreviewImage] = useState(initialData?.thumbnail || null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setLessonData(prev => ({ ...prev, [name]: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setLessonData(prev => ({ ...prev, [name]: value }));
    }
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const lessonDataToSave = {
      ...lessonData,
      lesson_number: lessonNumber,
      thumbnail: lessonData.thumbnail instanceof File ? lessonData.thumbnail.name : lessonData.thumbnail
    };
    onSave(lessonDataToSave);
  };

  return (
    <div className={`p-6 mt-4 ${darkMode ? 'bg-dark-gray-200' : 'bg-light-apricot'} rounded`}>
      <h3 className="text-xl font-bold mb-4">
        {initialData ? `Edit Lesson #${lessonNumber}` : `Add Lesson #${lessonNumber}`}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Lesson Title</label>
          <input
            type="text"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-100' : 'bg-white'}`}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={lessonData.description}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-100' : 'bg-white'}`}
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Duration (HH:MM:SS)</label>
          <input
            type="text"
            name="duration"
            value={lessonData.duration}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-100' : 'bg-white'}`}
            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
            placeholder="00:30:00"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Video URL</label>
          <input
            type="url"
            name="video_url"
            value={lessonData.video_url}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-100' : 'bg-white'}`}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Lesson Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-100' : 'bg-white'}`}
            accept="image/*"
          />
          {previewImage && (
            <img src={previewImage} alt="Thumbnail preview" className="mt-2 max-w-xs" />
          )}
        </div>
        <div>
          <label className="block mb-2">Lesson Points</label>
          <input
            type="number"
            name="points"
            value={lessonData.points}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-100' : 'bg-white'}`}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className={`${darkMode ? 'bg-dark-gray-100' : 'bg-light-blueberry'} text-white p-2 rounded`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${darkMode ? 'bg-dark-gray-100' : 'bg-light-citrus'} text-white p-2 rounded`}
          >
            {initialData ? 'Update Lesson' : 'Save Lesson'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;