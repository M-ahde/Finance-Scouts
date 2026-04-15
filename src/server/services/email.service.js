import nodemailer from "nodemailer";

// Transporter is created lazily so dotenv has time to load before first use
let _transporter = null;

function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "noreply@finance-scouts.com",
        pass: process.env.SMTP,
      },
    });
  }
  return _transporter;
}

const FROM = '"Finance Scouts" <noreply@finance-scouts.com>';

const BASE_STYLE = `
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #f4f6fb;
  margin: 0; padding: 0;
`;

const CARD_STYLE = `
  max-width: 600px; margin: 40px auto; background: #fff;
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
`;

const HEADER_STYLE = `
  background: linear-gradient(135deg, #1a3a5c 0%, #2563a8 100%);
  padding: 36px 40px 28px; text-align: center;
`;

const FOOTER_STYLE = `
  background: #f4f6fb; padding: 20px 40px;
  text-align: center; color: #888; font-size: 13px;
  border-top: 1px solid #e8eaf0;
`;

function buildEmail(title, bodyHtml) {
  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>${title}</title></head>
<body style="${BASE_STYLE}">
  <div style="${CARD_STYLE}">
    <div style="${HEADER_STYLE}">
      <h1 style="color:#fff;margin:0;font-size:26px;letter-spacing:1px;">Finance Scouts</h1>
      <p style="color:#b8d4f8;margin:6px 0 0;font-size:14px;">كلية إدارة الأعمال</p>
    </div>
    <div style="padding:36px 40px;">
      ${bodyHtml}
    </div>
    <div style="${FOOTER_STYLE}">
      Finance Scouts &mdash; College of Business Administration<br>
      هذا بريد آلي، لا تُرد عليه.
    </div>
  </div>
</body>
</html>`;
}

// ── Event Registration Confirmation ────────────────────────────────────────
export async function sendEventRegistrationConfirmation({ to, name, eventTitle, eventDate, eventLocation }) {
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("ar-SA", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      })
    : "";

  const body = `
    <h2 style="color:#1a3a5c;margin:0 0 8px;">تم تسجيلك بنجاح! 🎉</h2>
    <p style="color:#555;font-size:15px;margin:0 0 24px;">
      مرحباً <strong>${name}</strong>، يسعدنا تأكيد تسجيلك في الفعالية.
    </p>
    <div style="background:#f0f5ff;border-right:4px solid #2563a8;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 10px;font-size:16px;font-weight:bold;color:#1a3a5c;">${eventTitle}</p>
      ${formattedDate ? `<p style="margin:4px 0;color:#555;font-size:14px;">📅 ${formattedDate}</p>` : ""}
      ${eventLocation ? `<p style="margin:4px 0;color:#555;font-size:14px;">📍 ${eventLocation}</p>` : ""}
    </div>
    <p style="color:#555;font-size:14px;line-height:1.7;">
      احرص على الحضور في الوقت المحدد. إذا كنت بحاجة لأي مساعدة، لا تتردد في التواصل معنا.
    </p>
    <p style="color:#555;font-size:14px;margin-top:24px;">
      نتطلع لرؤيتك هناك!<br>
      <strong>فريق Finance Scouts</strong>
    </p>`;

  await getTransporter().sendMail({
    from: FROM,
    to,
    subject: `تأكيد التسجيل – ${eventTitle}`,
    html: buildEmail(`تأكيد التسجيل – ${eventTitle}`, body),
  });
}

// ── Join Request Received ───────────────────────────────────────────────────
export async function sendJoinRequestReceived({ to, name }) {
  const body = `
    <h2 style="color:#1a3a5c;margin:0 0 8px;">تم استلام طلبك ✅</h2>
    <p style="color:#555;font-size:15px;margin:0 0 20px;">
      مرحباً <strong>${name}</strong>،<br>
      تم استلام طلب انضمامك إلى فريق Finance Scouts بنجاح.
    </p>
    <p style="color:#555;font-size:14px;line-height:1.7;">
      سيقوم فريقنا بمراجعة طلبك وإبلاغك بالنتيجة في أقرب وقت ممكن.
      يُرجى متابعة بريدك الإلكتروني.
    </p>
    <p style="color:#555;font-size:14px;margin-top:24px;">
      شكراً لاهتمامك،<br>
      <strong>فريق Finance Scouts</strong>
    </p>`;

  await getTransporter().sendMail({
    from: FROM,
    to,
    subject: "تم استلام طلب انضمامك – Finance Scouts",
    html: buildEmail("تم استلام طلبك", body),
  });
}

// ── Join Request Status Notification ───────────────────────────────────────
export async function sendJoinRequestStatus({ to, name, status }) {
  const isAccepted = status === "accepted";

  const body = isAccepted
    ? `
      <h2 style="color:#16a34a;margin:0 0 8px;">تهانينا! تم قبول طلبك ✅</h2>
      <p style="color:#555;font-size:15px;margin:0 0 20px;">
        مرحباً <strong>${name}</strong>،<br>
        يسعدنا إبلاغك بأنه تم <strong>قبول</strong> طلب انضمامك إلى فريق Finance Scouts.
      </p>
      <p style="color:#555;font-size:14px;line-height:1.7;">
        سيتواصل معك أحد أعضاء الفريق قريباً لإطلاعك على الخطوات التالية.
      </p>
      <p style="color:#555;font-size:14px;margin-top:24px;">
        مرحباً بك في العائلة!<br>
        <strong>فريق Finance Scouts</strong>
      </p>`
    : `
      <h2 style="color:#dc2626;margin:0 0 8px;">بشأن طلب انضمامك</h2>
      <p style="color:#555;font-size:15px;margin:0 0 20px;">
        مرحباً <strong>${name}</strong>،<br>
        شكراً لاهتمامك بالانضمام إلى فريق Finance Scouts.
      </p>
      <p style="color:#555;font-size:14px;line-height:1.7;">
        بعد مراجعة طلبك، نأسف لإبلاغك بأننا لن نتمكن من قبوله في هذه المرحلة.
        نشجعك على التقديم مجدداً في الدورات القادمة.
      </p>
      <p style="color:#555;font-size:14px;margin-top:24px;">
        مع تمنياتنا لك بالتوفيق،<br>
        <strong>فريق Finance Scouts</strong>
      </p>`;

  await getTransporter().sendMail({
    from: FROM,
    to,
    subject: isAccepted ? "تهانينا! تم قبول طلب انضمامك" : "بشأن طلب انضمامك لـ Finance Scouts",
    html: buildEmail("نتيجة طلب الانضمام", body),
  });
}

// ── Password Reset ──────────────────────────────────────────────────────────
export async function sendPasswordReset({ to, name, resetLink }) {
  const body = `
    <h2 style="color:#1a3a5c;margin:0 0 8px;">إعادة تعيين كلمة المرور</h2>
    <p style="color:#555;font-size:15px;margin:0 0 20px;">
      مرحباً <strong>${name || ""}</strong>،<br>
      تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${resetLink}"
        style="background:#2563a8;color:#fff;padding:14px 36px;border-radius:8px;
               text-decoration:none;font-size:16px;font-weight:bold;display:inline-block;">
        إعادة تعيين كلمة المرور
      </a>
    </div>
    <p style="color:#888;font-size:13px;text-align:center;">
      هذا الرابط صالح لمدة <strong>ساعة واحدة</strong> فقط.
    </p>
    <p style="color:#888;font-size:13px;text-align:center;margin-top:12px;">
      إذا لم تطلب إعادة التعيين، تجاهل هذا البريد وسيبقى حسابك آمناً.
    </p>`;

  await getTransporter().sendMail({
    from: FROM,
    to,
    subject: "إعادة تعيين كلمة المرور – Finance Scouts",
    html: buildEmail("إعادة تعيين كلمة المرور", body),
  });
}

// ── Welcome Email (new user created by admin) ──────────────────────────────
export async function sendWelcomeEmail({ to, name, email, password }) {
  const body = `
    <h2 style="color:#1a3a5c;margin:0 0 8px;">مرحباً بك في لوحة التحكم 👋</h2>
    <p style="color:#555;font-size:15px;margin:0 0 20px;">
      مرحباً <strong>${name}</strong>،<br>
      تم إنشاء حسابك في نظام Finance Scouts بنجاح.
    </p>
    <div style="background:#f0f5ff;border-right:4px solid #2563a8;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 8px;color:#555;font-size:14px;">
        <strong>البريد الإلكتروني:</strong> ${email}
      </p>
      <p style="margin:0;color:#555;font-size:14px;">
        <strong>كلمة المرور المؤقتة:</strong> ${password}
      </p>
    </div>
    <p style="color:#dc2626;font-size:13px;">
      ⚠️ يُرجى تغيير كلمة المرور فور تسجيل دخولك الأول.
    </p>
    <p style="color:#555;font-size:14px;margin-top:24px;">
      <strong>فريق Finance Scouts</strong>
    </p>`;

  await getTransporter().sendMail({
    from: FROM,
    to,
    subject: "مرحباً بك – تم إنشاء حسابك في Finance Scouts",
    html: buildEmail("مرحباً بك", body),
  });
}
