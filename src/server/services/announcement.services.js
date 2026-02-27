// services/announcement.services.js
import Announcement from "../models/Announcment.js";

/**
 * جلب كل الإعلانات
 */
export const getAllAnnouncements = async () => {
  return await Announcement.find().sort({ date: -1 });
};

/**
 * إنشاء إعلان جديد
 * @param {Object} data - بيانات الإعلان
 */
export const createAnnouncement = async (data) => {
  const announcement = new Announcement(data);
  return await announcement.save();
};

/**
 * تعديل إعلان
 * @param {String} id - ID الإعلان
 * @param {Object} data - البيانات الجديدة
 */
export const updateAnnouncement = async (id, data) => {
  return await Announcement.findByIdAndUpdate(id, data, { new: true });
};

/**
 * حذف إعلان
 * @param {String} id - ID الإعلان
 */
export const deleteAnnouncement = async (id) => {
  await Announcement.findByIdAndDelete(id);
  return { message: "Announcement deleted successfully" };
};
