<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date'
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'タスク',
            'due_date' => '期日', // 他のフィールドも同様にカスタマイズできます
        ];
    }
}
