import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ProductSpecsTable({ specs = [], compatibility = [] }) {
  return (
    <div className="boo-pdp-specs-section">
      {/* Specifications Table */}
      {specs.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--heading)' }}>
            Specifications
          </h3>
          <table className="boo-specs-table">
            <tbody>
              {specs.map((spec, idx) => (
                <tr key={idx}>
                  <th>{spec.key}</th>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Vehicle Compatibility List */}
      {compatibility.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--heading)' }}>
            Vehicle Compatibility
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 0.75rem 0' }}>
            Confirmed fitment for the following vehicle models and years:
          </p>
          <div className="boo-compat-list">
            {compatibility.map((model, idx) => (
              <div key={idx} className="boo-compat-item">
                <CheckCircle2 size={16} color="var(--secondary)" />
                <span>{model}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
