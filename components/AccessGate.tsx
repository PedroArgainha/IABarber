import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { COLORS, FONTS, RADIUS } from "../constants/theme";
import { getApiBaseUrl } from "../lib/api";

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function checkAccess() {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/access-check`, {
        credentials: "same-origin",
      });

      const data = await response.json();
      setAllowed(Boolean(data.ok));
    } catch {
      setAllowed(false);
    } finally {
      setChecking(false);
    }
  }

  async function submitPassword() {
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/access-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Chave inválida.");
      }

      setAllowed(true);
    } catch (err: any) {
      setError(err.message || "Erro ao validar chave.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    checkAccess();
  }, []);

  if (checking) {
    return (
      <View style={s.screen}>
        <ActivityIndicator color={COLORS.accent} />
      </View>
    );
  }

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <View style={s.screen}>
      <View style={s.card}>
        <Text style={s.title}>Acesso reservado</Text>

        <Text style={s.subtitle}>
          Introduz a chave de acesso fornecida para testar a aplicação.
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Chave de acesso"
          placeholderTextColor={COLORS.textTertiary}
          secureTextEntry
          style={s.input}
          onSubmitEditing={submitPassword}
        />

        {error ? <Text style={s.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[s.button, submitting && s.buttonDisabled]}
          onPress={submitPassword}
          disabled={submitting}
          activeOpacity={0.85}
        >
          <Text style={s.buttonText}>
            {submitting ? "A validar..." : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: "100vh" as any,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    borderRadius: RADIUS.xl,
    padding: 28,
  },
  title: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.display,
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    fontFamily: FONTS.body,
    fontSize: 16,
    marginBottom: 12,
  },
  error: {
    color: "#ff8a8a",
    fontFamily: FONTS.body,
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#111",
    fontFamily: FONTS.bodyMedium,
    fontSize: 16,
  },
});