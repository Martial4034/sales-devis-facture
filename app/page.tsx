"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Check, FileText, Table, FolderOpen, FileText as GoogleDoc } from "lucide-react";

interface N8nResponse {
  status: "success" | "error";
  type: "devis" | "contrat";
  links: {
    pdf: string;
    excel: string;
    drive: string;
  };
  fileName: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [n8nResponse, setN8nResponse] = useState<N8nResponse | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "",
  });

  const copyToClipboard = async (text: string, linkType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(linkType);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
    }
  };

  const handleSubmit = async (type: "devis" | "contrat") => {
    setLoading(true);
    setError("");
    setSuccess(false);
    setN8nResponse(null);

    try {
      const response = await fetch(
        "https://n8n-large.teliosa.com/webhook/af10ac8f-f614-488e-9fc8-83bb19d90755",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Une erreur est survenue");
      }

      const data: N8nResponse = await response.json();
      setN8nResponse(data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Devis / Contrat Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Nom Prénom"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                placeholder="Adresse (facultatif)"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMethod: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Modalité de paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5800€">Full Pay : 5800€</SelectItem>
                  <SelectItem value="2x3000€">Split Pay : 2x3000€</SelectItem>
                  <SelectItem value="3x2000€">Split Pay : 3x2000€</SelectItem>
                  <SelectItem value="4x1500€">Split Pay : 4x1500€</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1"
              onClick={() => handleSubmit("devis")}
              disabled={loading || !formData.name || !formData.paymentMethod}
              variant={success ? "default" : "outline"}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Générer un devis
            </Button>
            <Button
              className="flex-1"
              onClick={() => handleSubmit("contrat")}
              disabled={loading || !formData.name || !formData.paymentMethod}
              variant={success ? "default" : "outline"}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Générer un contrat
            </Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {n8nResponse && success && (
            <div className="space-y-4 mt-4">
              <div className="text-green-500 text-sm text-center">
                {n8nResponse.type === "devis" ? "Devis" : "Contrat"} généré avec succès !
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">PDF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={n8nResponse.links.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Voir
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(n8nResponse.links.pdf, "pdf")}
                    >
                      {copiedLink === "pdf" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    {n8nResponse.type === "contrat" ? (
                      <>
                        <GoogleDoc className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Google Doc</span>
                      </>
                    ) : (
                      <>
                        <Table className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Excel</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={n8nResponse.links.excel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Voir
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(n8nResponse.links.excel, "excel")}
                    >
                      {copiedLink === "excel" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Drive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={n8nResponse.links.drive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Voir
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(n8nResponse.links.drive, "drive")}
                    >
                      {copiedLink === "drive" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
