import * as publicationService from'../services/publication.service.js';

// جلب الكل
export const getAll = async (req, res) => {
  try {
    const pubs = await publicationService.getAllPublications();
    res.json(pubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// جلب واحد
export const getById = async (req, res) => {
  try {
    const pub = await publicationService.getPublicationById(req.params.id);

    if (!pub) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(pub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// إضافة
export const create = async (req, res) => {
  try {
    const parsedType = JSON.parse(req.body.type);
    const typeKey = parsedType.en
      ? parsedType.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      : "misc";

    const data = {
      ...req.body,
      title: JSON.parse(req.body.title),
      description: JSON.parse(req.body.description),
      type: parsedType,
      typeKey,
      pdfUrl: req?.file?.path,
    };

    const saved = await publicationService.createPublication(data);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// تعديل
export const update = async (req, res) => {
  try {
    const body = { ...req.body };

    if (body.title) body.title = JSON.parse(body.title);
    if (body.description) body.description = JSON.parse(body.description);
    if (body.type) {
      const parsedType = JSON.parse(body.type);
      body.type = parsedType;
      body.typeKey = parsedType.en
        ? parsedType.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        : "misc";
    }

    const updated = await publicationService.updatePublication(
      req.params.id,
      body
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// حذف
export const Delete = async (req, res) => {
  try {
    const deleted = await publicationService.deletePublication(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
