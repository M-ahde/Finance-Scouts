// services/workshop.services.js
import Workshop from "../models/Workshop.js";

/**
 * جلب كل الورش
 */
export const getAllWorkshops = async () => {
  return await Workshop.find().sort({ date: 1 });
};

/**
 * إنشاء ورشة جديدة
 * @param {Object} data - بيانات الورشة (title, description, date, time, location)
 */
export const createWorkshop = async (data) => {
  const workshop = new Workshop(data);
  return await workshop.save();
};

/**
 * تحديث ورشة
 * @param {String} id - ID الورشة
 * @param {Object} data - البيانات الجديدة
 */
export const updateWorkshop = async (id, data) => {
  return await Workshop.findByIdAndUpdate(id, data, { new: true });
};

/**
 * حذف ورشة
 * @param {String} id - ID الورشة
 */
export const deleteWorkshop = async (id) => {
  await Workshop.findByIdAndDelete(id);
  return { message: "Workshop deleted successfully" };
};

export const count = async() => {
  return await Workshop.countDocuments();
}