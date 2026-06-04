document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Currencies list representing all countries
    // ============================================
    const CURRENCIES = [
        { code: 'USD', name: 'USD - US Dollar ($)' },
        { code: 'EUR', name: 'EUR - Euro (€)' },
        { code: 'GBP', name: 'GBP - British Pound (£)' },
        { code: 'INR', name: 'INR - Indian Rupee (₹)' },
        { code: 'AUD', name: 'AUD - Australian Dollar (A$)' },
        { code: 'CAD', name: 'CAD - Canadian Dollar (C$)' },
        { code: 'JPY', name: 'JPY - Japanese Yen (¥)' },
        { code: 'CNY', name: 'CNY - Chinese Yuan (¥)' },
        { code: 'CHF', name: 'CHF - Swiss Franc (CHF)' },
        { code: 'NZD', name: 'NZD - New Zealand Dollar (NZ$)' },
        { code: 'SGD', name: 'SGD - Singapore Dollar (S$)' },
        { code: 'HKD', name: 'HKD - Hong Kong Dollar (HK$)' },
        { code: 'AED', name: 'AED - UAE Dirham (AED)' },
        { code: 'SAR', name: 'SAR - Saudi Riyal (SR)' },
        { code: 'ZAR', name: 'ZAR - South African Rand (R)' },
        { code: 'BRL', name: 'BRL - Brazilian Real (R$)' },
        { code: 'RUB', name: 'RUB - Russian Ruble (₽)' },
        { code: 'KRW', name: 'KRW - South Korean Won (₩)' },
        { code: 'MXN', name: 'MXN - Mexican Peso ($)' },
        { code: 'TRY', name: 'TRY - Turkish Lira (₺)' },
        { code: 'IDR', name: 'IDR - Indonesian Rupiah (Rp)' },
        { code: 'MYR', name: 'MYR - Malaysian Ringgit (RM)' },
        { code: 'PHP', name: 'PHP - Philippine Peso (₱)' },
        { code: 'THB', name: 'THB - Thai Baht (฿)' },
        { code: 'VND', name: 'VND - Vietnamese Dong (₫)' },
        { code: 'SEK', name: 'SEK - Swedish Krona (kr)' },
        { code: 'NOK', name: 'NOK - Norwegian Krone (kr)' },
        { code: 'DKK', name: 'DKK - Danish Krone (kr)' },
        { code: 'PLN', name: 'PLN - Polish Zloty (zł)' },
        { code: 'EGP', name: 'EGP - Egyptian Pound (E£)' }
    ];

    // ============================================
    // Default Lead Fields (the template data)
    // ============================================
    let fields = [
        { id: 'f1', name: 'leadName',       type: 'string', format: 'none',  required: true,  validation: '' },
        { id: 'f3', name: 'email',           type: 'string', format: 'email', required: false, validation: '' },
        { id: 'f4', name: 'linkedinUrl',     type: 'url',    format: 'url',   required: false, validation: '' },
        { id: 'f9', name: 'currency',        type: 'string', format: 'currency', required: false, validation: '' },
        { id: 'f7', name: 'leadFoundDate',   type: 'date',   format: 'date',  required: true,  validation: 'Cannot be a future date' },
        { id: 'f8', name: 'nextActionDate',  type: 'date',   format: 'date',  required: false, validation: 'Must be today or future' },
    ];

    // Store entered values keyed by field name
    let fieldValues = {};

    // Store all saved leads
    let savedLeads = [];

    let editingFieldId = null;
    let fieldIdCounter = 10;

    // ============================================
    // DOM References
    // ============================================
    const fieldsTableBody    = document.getElementById('fieldsTableBody');
    const fieldCount         = document.getElementById('fieldCount');
    const templateGrid       = document.getElementById('templateGrid');
    const schemaOutput       = document.getElementById('schemaOutput');
    const fieldModal         = document.getElementById('fieldModal');
    const modalTitle         = document.getElementById('modalTitle');
    const modalFieldName     = document.getElementById('modalFieldName');
    const modalFieldType     = document.getElementById('modalFieldType');
    const modalFieldFormat   = document.getElementById('modalFieldFormat');
    const modalFieldRequired = document.getElementById('modalFieldRequired');
    const modalSaveBtn       = document.getElementById('modalSaveBtn');
    const modalCancelBtn     = document.getElementById('modalCancelBtn');
    const modalClose         = document.getElementById('modalClose');
    const modalNameError     = document.getElementById('modalNameError');
    const modalFormatError   = document.getElementById('modalFormatError');
    const addFieldBtn        = document.getElementById('addFieldBtn');
    const copySchemaBtn      = document.getElementById('copySchemaBtn');
    const toast              = document.getElementById('toast');
    const leadTemplateForm   = document.getElementById('leadTemplateForm');
    const clearTemplateBtn   = document.getElementById('clearTemplateBtn');
    const leadsCount         = document.getElementById('leadsCount');
    const leadsEmptyState    = document.getElementById('leadsEmptyState');
    const leadsTableWrapper  = document.getElementById('leadsTableWrapper');
    const leadsTableHead     = document.getElementById('leadsTableHead');
    const leadsTableBody     = document.getElementById('leadsTableBody');

    // Tabs
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // ============================================
    // Tab Switching
    // ============================================
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');

            // Re-render active tab content
            if (btn.dataset.tab === 'fields') renderFieldsTable();
            if (btn.dataset.tab === 'schema') renderSchema();
            if (btn.dataset.tab === 'leads') renderAllLeads();
        });
    });

    // ============================================
    // Render Lead Template Form (Tab 1)
    // ============================================
    function renderTemplateForm() {
        templateGrid.innerHTML = fields.map(f => {
            const reqMark = f.required ? '<span class="req">*</span>' : '';
            const label = camelToTitle(f.name);
            const currentVal = fieldValues[f.name] || '';
            let inputHtml = '';

            if (f.format === 'currency') {
                const options = CURRENCIES.map(curr => {
                    const selected = currentVal === curr.code ? 'selected' : '';
                    return `<option value="${curr.code}" ${selected}>${curr.name}</option>`;
                }).join('');
                inputHtml = `
                    <select name="${f.name}" id="tmpl_${f.name}">
                        <option value="">-- Select Currency --</option>
                        ${options}
                    </select>
                `;
            } else if (f.type === 'date') {
                inputHtml = `<input type="date" name="${f.name}" id="tmpl_${f.name}" value="${currentVal}">`;
            } else if (f.type === 'url') {
                inputHtml = `<input type="url" name="${f.name}" id="tmpl_${f.name}" placeholder="https://..." value="${escapeAttr(currentVal)}">`;
            } else if (f.format === 'email') {
                inputHtml = `<input type="email" name="${f.name}" id="tmpl_${f.name}" placeholder="name@example.com" value="${escapeAttr(currentVal)}">`;
            } else {
                inputHtml = `<input type="text" name="${f.name}" id="tmpl_${f.name}" placeholder="Enter ${label.toLowerCase()}" value="${escapeAttr(currentVal)}">`;
            }

            let errorMsg = '';
            if (f.name === 'leadFoundDate') errorMsg = 'Cannot be a future date';
            else if (f.name === 'nextActionDate') errorMsg = 'Must be today or a future date';
            else if (f.required) errorMsg = `${label} is required`;

            return `
                <div class="preview-group" data-field="${f.name}">
                    <label for="tmpl_${f.name}">${label} ${reqMark}</label>
                    ${inputHtml}
                    <span class="field-error">${errorMsg}</span>
                </div>
            `;
        }).join('');

        // Bind input listeners to sync values in real time
        templateGrid.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                fieldValues[input.name] = input.value;
                // Clear error state on type
                input.closest('.preview-group').classList.remove('has-error');
            });
            input.addEventListener('change', () => {
                fieldValues[input.name] = input.value;
            });
        });
    }

    // ============================================
    // Render Fields Table (Tab 2) — includes current values
    // ============================================
    function renderFieldsTable() {
        fieldCount.textContent = `${fields.length} field${fields.length !== 1 ? 's' : ''}`;

        fieldsTableBody.innerHTML = fields.map((f, idx) => {
            const val = fieldValues[f.name];
            const valDisplay = val
                ? `<span class="field-value" title="${escapeAttr(val)}">${escapeHtml(val)}</span>`
                : `<span class="field-value empty">—</span>`;

            return `
                <tr data-id="${f.id}">
                    <td style="color:var(--text-muted)">${idx + 1}</td>
                    <td><span class="field-name">${f.name}</span></td>
                    <td><span class="field-type-badge ${f.type}">${capitalize(f.type)}</span></td>
                    <td>${f.format === 'none' ? '<span style="color:var(--text-muted)">—</span>' : capitalize(f.format)}</td>
                    <td>
                        <span class="required-badge ${f.required ? 'yes' : 'no'}">
                            ${f.required ? '● Yes' : '○ No'}
                        </span>
                    </td>
                    <td style="color:var(--text-muted); font-size:0.8rem;">${f.validation || '—'}</td>
                    <td>${valDisplay}</td>
                    <td>
                        <div class="field-actions">
                            <button class="action-btn edit-btn" data-id="${f.id}" title="Edit">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </button>
                            <button class="action-btn delete delete-btn" data-id="${f.id}" title="Delete">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Bind edit / delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(btn.dataset.id));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteField(btn.dataset.id));
        });
    }

    // ============================================
    // Render JSON Schema (with syntax highlighting)
    // ============================================
    function renderSchema() {
        const schema = {};
        fields.forEach(f => {
            const entry = { type: f.type, required: f.required };
            if (f.format && f.format !== 'none') {
                entry.format = f.format;
            }
            schema[f.name] = entry;
        });

        const jsonStr = JSON.stringify(schema, null, 2);
        schemaOutput.innerHTML = syntaxHighlight(jsonStr);
    }

    function syntaxHighlight(json) {
        return json
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"([^"]+)"(?=\s*:)/g, '<span class="json-key">"$1"</span>')
            .replace(/:\s*"([^"]+)"/g, ': <span class="json-string">"$1"</span>')
            .replace(/:\s*true/g, ': <span class="json-bool-true">true</span>')
            .replace(/:\s*false/g, ': <span class="json-bool-false">false</span>');
    }

    // ============================================
    // Lead Template Form — Submit & Validation
    // ============================================
    leadTemplateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const today = getTodayString();

        fields.forEach(f => {
            const group = templateGrid.querySelector(`[data-field="${f.name}"]`);
            const input = group ? group.querySelector('input') : null;
            if (!input) return;

            group.classList.remove('has-error');
            const val = input.value.trim();

            // Required check
            if (f.required && !val) {
                group.classList.add('has-error');
                isValid = false;
                return;
            }

            // Date-specific smart validations
            if (f.name === 'leadFoundDate' && val && val > today) {
                group.classList.add('has-error');
                isValid = false;
            }
            if (f.name === 'nextActionDate' && val && val < today) {
                group.classList.add('has-error');
                isValid = false;
            }
        });

        // Cross-field: nextActionDate >= leadFoundDate
        const foundVal = fieldValues['leadFoundDate'];
        const nextVal = fieldValues['nextActionDate'];
        if (foundVal && nextVal && nextVal < foundVal) {
            const nextGroup = templateGrid.querySelector('[data-field="nextActionDate"]');
            if (nextGroup) {
                nextGroup.classList.add('has-error');
                const errSpan = nextGroup.querySelector('.field-error');
                if (errSpan) errSpan.textContent = 'Must be ≥ Lead Found Date';
            }
            isValid = false;
        }

        if (isValid) {
            // Collect non-empty values
            const leadEntry = {};
            fields.forEach(f => {
                const val = fieldValues[f.name];
                if (val && val.trim()) leadEntry[f.name] = val.trim();
            });

            // ---- Duplicate lead check ----
            const newName  = (leadEntry.leadName || '').toLowerCase().trim();
            const newEmail = (leadEntry.email || '').toLowerCase().trim();
            const newPhone = (leadEntry.phone || '').replace(/\s+/g, '').trim();

            const duplicate = savedLeads.find(existing => {
                const exName  = (existing.leadName || '').toLowerCase().trim();
                const exEmail = (existing.email || '').toLowerCase().trim();
                const exPhone = (existing.phone || '').replace(/\s+/g, '').trim();

                // Exact name match
                if (newName && exName && newName === exName) return true;
                // Same email (if provided)
                if (newEmail && exEmail && newEmail === exEmail) return true;
                // Same phone (if provided)
                if (newPhone && exPhone && newPhone === exPhone) return true;

                return false;
            });

            if (duplicate) {
                showToast(`Duplicate lead detected! "${duplicate.leadName || 'Untitled'}" already exists.`);
                return;
            }

            leadEntry._id = Date.now();
            leadEntry._savedAt = new Date().toLocaleString();
            savedLeads.push(leadEntry);

            showToast(`Lead "${leadEntry.leadName || 'Untitled'}" saved successfully`);

            // Clear form for next entry
            fieldValues = {};
            renderTemplateForm();
            renderFieldsTable();
        } else {
            showToast('Please fix the errors above');
            const firstErr = templateGrid.querySelector('.has-error input');
            if (firstErr) firstErr.focus();
        }
    });

    // Clear form
    clearTemplateBtn.addEventListener('click', () => {
        fieldValues = {};
        renderTemplateForm();
        showToast('Form cleared');
    });

    // ============================================
    // Modal Logic — with STRICT RULES
    // ============================================

    // Validation rules for field names
    const CAMEL_CASE_REGEX = /^[a-z][a-zA-Z0-9]{2,29}$/;

    // Format compatibility map: which formats are valid for each type
    const FORMAT_COMPAT = {
        string: ['none', 'email', 'currency'],
        url:    ['url', 'none'],
        date:   ['date', 'none'],
        number: ['none'],
    };

    function validateFieldModal() {
        let valid = true;
        const name = modalFieldName.value.trim();
        const type = modalFieldType.value;
        const format = modalFieldFormat.value;

        // Clear previous errors
        modalNameError.textContent = '';
        modalFormatError.textContent = '';
        modalFieldName.style.borderColor = '';
        modalFieldFormat.style.borderColor = '';

        // Rule 1: camelCase, 3-30 chars, letters/numbers only
        if (!name) {
            modalNameError.textContent = 'Field name is required.';
            modalFieldName.style.borderColor = 'var(--error)';
            valid = false;
        } else if (!CAMEL_CASE_REGEX.test(name)) {
            if (name.length < 3) {
                modalNameError.textContent = 'Minimum 3 characters required.';
            } else if (name.length > 30) {
                modalNameError.textContent = 'Maximum 30 characters allowed.';
            } else if (/^[A-Z]/.test(name)) {
                modalNameError.textContent = 'Must start with a lowercase letter (camelCase).';
            } else if (/[^a-zA-Z0-9]/.test(name)) {
                modalNameError.textContent = 'Only letters and numbers allowed. No spaces or special characters.';
            } else {
                modalNameError.textContent = 'Must be in camelCase format (e.g. companyName).';
            }
            modalFieldName.style.borderColor = 'var(--error)';
            valid = false;
        }

        // Rule 2: No duplicates (except when editing the same field)
        if (name && valid) {
            const duplicate = fields.find(f => f.name === name && f.id !== editingFieldId);
            if (duplicate) {
                modalNameError.textContent = `Field "${name}" already exists. No duplicates allowed.`;
                modalFieldName.style.borderColor = 'var(--error)';
                valid = false;
            }
        }

        // Rule 3: Format must be compatible with type
        const allowedFormats = FORMAT_COMPAT[type] || ['none'];
        if (!allowedFormats.includes(format)) {
            modalFormatError.textContent = `Format "${capitalize(format)}" is not compatible with type "${capitalize(type)}". Allowed: ${allowedFormats.map(capitalize).join(', ')}`;
            modalFieldFormat.style.borderColor = 'var(--error)';
            valid = false;
        }

        return valid;
    }

    function openAddModal() {
        editingFieldId = null;
        modalTitle.textContent = 'Add Field';
        modalFieldName.value = '';
        modalFieldType.value = 'string';
        modalFieldFormat.value = 'none';
        modalFieldRequired.checked = false;
        modalSaveBtn.textContent = 'Add Field';
        modalNameError.textContent = '';
        modalFormatError.textContent = '';
        modalFieldName.style.borderColor = '';
        modalFieldFormat.style.borderColor = '';
        fieldModal.classList.add('active');
        setTimeout(() => modalFieldName.focus(), 100);
    }

    function openEditModal(id) {
        const field = fields.find(f => f.id === id);
        if (!field) return;

        editingFieldId = id;
        modalTitle.textContent = 'Edit Field';
        modalFieldName.value = field.name;
        modalFieldType.value = field.type;
        modalFieldFormat.value = field.format;
        modalFieldRequired.checked = field.required;
        modalSaveBtn.textContent = 'Save Changes';
        modalNameError.textContent = '';
        modalFormatError.textContent = '';
        modalFieldName.style.borderColor = '';
        modalFieldFormat.style.borderColor = '';
        fieldModal.classList.add('active');
        setTimeout(() => modalFieldName.focus(), 100);
    }

    function closeModal() {
        fieldModal.classList.remove('active');
        editingFieldId = null;
    }

    function saveField() {
        // Run strict validation
        if (!validateFieldModal()) return;

        const name     = modalFieldName.value.trim();
        const type     = modalFieldType.value;
        const format   = modalFieldFormat.value;
        const required = modalFieldRequired.checked;

        // Auto-set validation for date fields
        let validation = '';
        if (name.toLowerCase().includes('founddate') || name.toLowerCase().includes('found_date')) {
            validation = 'Cannot be a future date';
        } else if (name.toLowerCase().includes('actiondate') || name.toLowerCase().includes('action_date') || name.toLowerCase().includes('nextaction') || name.toLowerCase().includes('followup')) {
            validation = 'Must be today or future';
        }

        if (editingFieldId) {
            const field = fields.find(f => f.id === editingFieldId);
            if (field) {
                // If name changed, migrate the stored value
                if (field.name !== name && fieldValues[field.name] !== undefined) {
                    fieldValues[name] = fieldValues[field.name];
                    delete fieldValues[field.name];
                }
                field.name     = name;
                field.type     = type;
                field.format   = format;
                field.required = required;
                field.validation = validation || field.validation;
            }
            showToast('Field updated successfully');
        } else {
            fields.push({
                id: `f${fieldIdCounter++}`,
                name, type, format, required,
                validation
            });
            showToast('Field added successfully');
        }

        closeModal();
        renderTemplateForm();
        renderFieldsTable();
    }

    function deleteField(id) {
        const field = fields.find(f => f.id === id);
        if (!field) return;
        // Clean up stored value
        delete fieldValues[field.name];
        fields = fields.filter(f => f.id !== id);
        renderFieldsTable();
        renderTemplateForm();
        showToast(`"${field.name}" removed`);
    }

    // ============================================
    // Copy Schema
    // ============================================
    copySchemaBtn.addEventListener('click', () => {
        const schema = {};
        fields.forEach(f => {
            const entry = { type: f.type, required: f.required };
            if (f.format && f.format !== 'none') entry.format = f.format;
            schema[f.name] = entry;
        });
        navigator.clipboard.writeText(JSON.stringify(schema, null, 2)).then(() => {
            showToast('Schema copied to clipboard');
        }).catch(() => {
            showToast('Failed to copy');
        });
    });

    // ============================================
    // Toast
    // ============================================
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ============================================
    // Utilities
    // ============================================
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function camelToTitle(str) {
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, s => s.toUpperCase())
            .trim();
    }

    function getTodayString() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }

    function escapeAttr(str) {
        return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function escapeHtml(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    // ============================================
    // Event Bindings
    // ============================================
    addFieldBtn.addEventListener('click', openAddModal);
    modalCancelBtn.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    modalSaveBtn.addEventListener('click', saveField);

    fieldModal.addEventListener('click', (e) => {
        if (e.target === fieldModal) closeModal();
    });

    // Auto-sync format when type changes in modal
    modalFieldType.addEventListener('change', () => {
        const type = modalFieldType.value;
        if (type === 'url')         modalFieldFormat.value = 'url';
        else if (type === 'date')   modalFieldFormat.value = 'date';
        else if (type === 'number') modalFieldFormat.value = 'none';
        else                        modalFieldFormat.value = 'none';
        // Clear format error on type change
        modalFormatError.textContent = '';
        modalFieldFormat.style.borderColor = '';
    });

    // ============================================
    // Render All Leads Table (Tab 4)
    // ============================================
    function renderAllLeads() {
        leadsCount.textContent = `${savedLeads.length} lead${savedLeads.length !== 1 ? 's' : ''}`;

        if (savedLeads.length === 0) {
            leadsEmptyState.style.display = '';
            leadsTableWrapper.style.display = 'none';
            return;
        }

        leadsEmptyState.style.display = 'none';
        leadsTableWrapper.style.display = '';

        // Build header from current fields
        leadsTableHead.innerHTML = `
            <th style="width:3%">#</th>
            ${fields.map(f => `<th>${camelToTitle(f.name)}</th>`).join('')}
            <th style="width:10%">Saved At</th>
            <th style="width:4%"></th>
        `;

        // Build rows
        leadsTableBody.innerHTML = savedLeads.map((lead, idx) => {
            const cells = fields.map(f => {
                const val = lead[f.name];
                return `<td>${val ? escapeHtml(val) : '<span style="color:var(--text-muted)">—</span>'}</td>`;
            }).join('');

            return `
                <tr>
                    <td style="color:var(--text-muted)">${idx + 1}</td>
                    ${cells}
                    <td style="font-size:0.75rem; color:var(--text-muted)">${lead._savedAt}</td>
                    <td>
                        <button class="leads-delete-btn" data-lead-id="${lead._id}" title="Delete lead">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        // Bind delete buttons
        document.querySelectorAll('.leads-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.leadId);
                savedLeads = savedLeads.filter(l => l._id !== id);
                renderAllLeads();
                showToast('Lead deleted');
            });
        });
    }

    // ============================================
    // Initial Render
    // ============================================
    renderTemplateForm();
    renderFieldsTable();
    renderAllLeads();
});
